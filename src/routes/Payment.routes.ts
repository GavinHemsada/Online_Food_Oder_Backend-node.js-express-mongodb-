import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByCustomer
} from '@/controllers/Payment.controller';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.get('/customer/:customerId', getPaymentsByCustomer);

export { router as PayementRouter };
