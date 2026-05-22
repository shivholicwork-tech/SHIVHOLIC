import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;

  // In-memory token version store for revocation support.
  // In production, this would be stored in Redis or the database.
  private tokenVersions: Map<string, number> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    if (!refreshSecret) {
      throw new Error('JWT_REFRESH_SECRET environment variable is required');
    }

    this.jwtSecret = secret;
    this.jwtRefreshSecret = refreshSecret;
  }

  getTokenVersion(userId: string): number {
    return this.tokenVersions.get(userId) || 0;
  }

  revokeTokens(userId: string): void {
    const current = this.getTokenVersion(userId);
    this.tokenVersions.set(userId, current + 1);
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name || null,
        passwordHash,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }

  async refreshToken(token: string) {
    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.jwtRefreshSecret,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check token version for revocation
      const currentVersion = this.getTokenVersion(user.id);
      if (payload.tokenVersion !== undefined && payload.tokenVersion < currentVersion) {
        throw new ForbiddenException('Token has been revoked');
      }

      return this.generateTokens(user.id, user.email);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async generateTokens(userId: string, email: string) {
    const tokenVersion = this.getTokenVersion(userId);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, tokenVersion },
        {
          secret: this.jwtSecret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, tokenVersion },
        {
          secret: this.jwtRefreshSecret,
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
