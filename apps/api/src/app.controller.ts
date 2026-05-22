import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  @ApiTags('Health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return this.appService.getHealth();
  }

  @Public()
  @Get('status')
  @ApiTags('Health')
  @ApiOperation({ summary: 'API status endpoint' })
  getStatus() {
    return this.appService.getStatus();
  }
}
