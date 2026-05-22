import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookGuard implements CanActivate {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY') || '';
    this.stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const signature = request.headers['stripe-signature'] as string | undefined;

    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new BadRequestException('Stripe webhook secret not configured');
    }

    try {
      // Verify the webhook signature using Stripe SDK
      const rawBody = (request as Request & { rawBody?: Buffer }).rawBody;
      if (!rawBody) {
        throw new BadRequestException('Raw body not available for signature verification');
      }
      this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Webhook signature verification failed: ${message}`);
    }
  }
}
