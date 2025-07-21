import { Request, Response } from 'express';
import { Payment } from '@/models/Payment';
import { Order } from '@/models/Order';
import { PaymentDto, PaymentStatesENUM } from '@/dto/Payment.dto';
import { processPayment } from '@/Utils/payment';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { order, customer, methord, amount } = <PaymentDto>req.body;

    const orderExists = await Order.findById(req.body.order);
    if (!orderExists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Stripe payment processing
    const result = await processPayment({
      methord,
      amount,
      currency: 'usd',
      description: `Payment for order ${order}`,
    });

    const payment = new Payment({
      order,
      customer,
      methord,
      amount,
      paymentDate: new Date(),
      states: result.success ? PaymentStatesENUM.Paid : PaymentStatesENUM.Failed
    });

    await payment.save();

    res.status(result.success ? 201 : 402).json({
      message: result.message,
      payment,
      transactionId: result.transactionId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await Payment.find().populate('order customer');
    res.status(200).json({ message: 'All payments', payments });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('order customer');
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment found', payment });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getPaymentsByCustomer = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find({ customer: req.params.customerId }).populate('order');
    res.status(200).json({ message: 'Customer payments', payments });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};
