import { Request, Response } from 'express';
import { OrderItems } from '@/models/OrderItem';
import { Order } from '@/models/Order';
import { Food } from '@/models/Food';
import { OrderItemDto } from '@/dto/Ordetitem.dto';

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const orderExists = await Order.findById(req.body.order);
    const foodExists = await Food.findById(req.body.food);

    if (!orderExists || !foodExists) {
      return res.status(400).json({ error: 'Order or Food not found' });
    }

    const orderItem = new OrderItems({ ...<OrderItemDto>req.body });
    await orderItem.save();

    res.status(201).json({ message: 'Order item created', orderItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getAllOrderItems = async (req: Request, res: Response) => {
  try {
    const items = await OrderItems.find().populate('order food');
    res.status(200).json({ message: 'All order items', items });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getOrderItemsByOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItems.find({ order: orderId }).populate('food');
    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found for this order' });
    }

    res.status(200).json({ message: 'Order items', items });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<OrderItemDto> = req.body;

    const updatedItem = await OrderItems.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.status(200).json({ message: 'Order item updated', updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await OrderItems.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Order item not found' });
    }

    res.status(200).json({ message: 'Order item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};
