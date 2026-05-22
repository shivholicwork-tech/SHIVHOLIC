import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/billing.dto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createCheckoutSession(dto: CreateCheckoutDto, userId: string) {
    // In production, create Stripe checkout session
    this.logger.log(`Creating checkout for user ${userId}, tier: ${dto.tier}`);

    return {
      sessionId: `cs_mock_${Date.now()}`,
      url: dto.successUrl || '/billing/success',
      message: 'Checkout session created (mock)',
    };
  }

  async handleWebhook(event: Record<string, unknown>) {
    const eventType = event.type as string;
    this.logger.log(`Processing webhook event: ${eventType}`);

    switch (eventType) {
      case 'checkout.session.completed':
        // Handle successful checkout
        break;
      case 'customer.subscription.updated':
        // Handle subscription update
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        break;
      default:
        this.logger.warn(`Unhandled event type: ${eventType}`);
    }

    return { received: true };
  }

  async getSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    return subscription || { tier: 'FREE', status: 'ACTIVE' };
  }

  async getInvoices(_userId: string) {
    // In production, fetch from Stripe API
    return {
      invoices: [],
      message: 'No invoices found (mock)',
    };
  }

  async createPortalSession(_userId: string) {
    // In production, create Stripe billing portal session
    return {
      url: '/billing/portal',
      message: 'Portal session created (mock)',
    };
  }
}
