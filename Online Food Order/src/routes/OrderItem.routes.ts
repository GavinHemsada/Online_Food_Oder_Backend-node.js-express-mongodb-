import express from 'express';
import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemsByOrder,
  updateOrderItem,
  deleteOrderItem
} from '@/controllers/OrderItem.controller';
import { validateDto } from '@/middleware/ValidateDTO.middleware';
import { OrderItemDto } from '@/dto/Ordetitem.dto';

const router = express.Router();

router.post('/', validateDto(OrderItemDto), createOrderItem);
router.get('/', getAllOrderItems);
router.get('/order/:orderId', getOrderItemsByOrder);
router.put('/:id', validateDto(OrderItemDto), updateOrderItem);
router.delete('/:id', deleteOrderItem);

export { router as OrderItemsRoute };