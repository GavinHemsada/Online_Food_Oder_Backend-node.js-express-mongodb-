import express from 'express';
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  getDeliveriesByState,
  updateDelivery,
  deleteDelivery
} from '@/controllers/Delivery.controller';

const router = express.Router();

router.post('/', createDelivery);
router.get('/', getAllDeliveries);
router.get('/:id', getDeliveryById);
router.get('/state/:state', getDeliveriesByState);
router.put('/:id', updateDelivery);
router.delete('/:id', deleteDelivery);

export { router as DeliveryRouter};
