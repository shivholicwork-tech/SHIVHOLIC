import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { StripeWebhookGuard } from './stripe-webhook.guard';

@Module({
  controllers: [BillingController],
  providers: [BillingService, StripeWebhookGuard],
  exports: [BillingService],
})
export class BillingModule {}
