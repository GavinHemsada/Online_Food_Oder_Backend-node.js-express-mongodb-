import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByResturent,
  updateOrder,
  deleteOrder,
  getOrderByCustomer,
  getOrdersByState} from '@/controllers/Order.controller';
import { OrderDto } from '@/dto/Order.dto';
import { validateDto } from '@/middleware/ValidateDTO.middleware';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/resturent/:resturentId', getOrdersByResturent);
router.get('/customer', getOrderByCustomer);
router.get('/state/:state', getOrdersByState);

router.post('/', validateDto(OrderDto), createOrder);
router.put('/:id',validateDto(OrderDto), updateOrder);
router.delete('/:id', deleteOrder);

export { router as OrderRoute };
