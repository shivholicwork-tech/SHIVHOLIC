import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { CreateCheckoutDto } from './dto/billing.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { StripeWebhookGuard } from './stripe-webhook.guard';
import { CurrentUser, JwtPayload } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('create-checkout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a checkout session' })
  async createCheckout(
    @Body() dto: CreateCheckoutDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.billingService.createCheckoutSession(dto, user.sub);
  }

  @Public()
  @Post('webhook')
  @UseGuards(StripeWebhookGuard)
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  async webhook(@Body() event: Record<string, unknown>) {
    return this.billingService.handleWebhook(event);
  }

  @Get('subscription')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current subscription' })
  async getSubscription(@CurrentUser() user: JwtPayload) {
    return this.billingService.getSubscription(user.sub);
  }

  @Get('invoices')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get invoices' })
  async getInvoices(@CurrentUser() user: JwtPayload) {
    return this.billingService.getInvoices(user.sub);
  }

  @Post('portal')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create billing portal session' })
  async createPortal(@CurrentUser() user: JwtPayload) {
    return this.billingService.createPortalSession(user.sub);
  }
}
