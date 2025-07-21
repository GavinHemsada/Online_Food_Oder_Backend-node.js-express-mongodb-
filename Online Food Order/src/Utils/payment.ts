import Stripe from 'stripe';
import { PaymentMethordsENUM } from '@/dto/Payment.dto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

interface PayenPayload {
  methord?: PaymentMethordsENUM;
  amount: number; 
  currency?: string;
  description?: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  gateway?: string;
  message: string;
}

export const processPayment = async ({
  methord = PaymentMethordsENUM.Card,
  amount,
  currency = 'usd',
  description = 'Payment',
}: PayenPayload): Promise<PaymentResult> => {
  if (amount <= 0) {
    return { success: false, message: 'Invalid amount' };
  }

  if (methord === PaymentMethordsENUM.Card) {
    try {
      const charge = await stripe.charges.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        description,
      });

      return {
        success: true,
        message: 'Payment successful',
        gateway: 'Stripe',
        transactionId: charge.id
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Payment failed',
        gateway: 'Stripe'
      };
    }
  }

  return {
    success: false,
    message: 'Unsupported payment method'
  };
};
