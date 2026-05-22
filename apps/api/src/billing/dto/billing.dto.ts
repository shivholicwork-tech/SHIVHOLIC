import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty({ description: 'Subscription tier to checkout', enum: ['STARTER', 'PRO', 'ENTERPRISE'] })
  @IsString()
  tier: string;

  @ApiProperty({ description: 'Success redirect URL', required: false })
  @IsString()
  @IsOptional()
  successUrl?: string;

  @ApiProperty({ description: 'Cancel redirect URL', required: false })
  @IsString()
  @IsOptional()
  cancelUrl?: string;
}
