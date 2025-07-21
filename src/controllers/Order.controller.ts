import { Request, Response } from 'express';
import { Order } from '@/models/Order';
import { AuthedRequest } from '@/middleware/JwtValidation.middleware';
import { Resturent } from '@/models/Resturent';
import { OrderDto, OrderStatesENUM } from '@/dto/Order.dto';

export const createOrder = async (req: AuthedRequest, res: Response) => {
  try {
    const resturent = await Resturent.findById(req.body.resturent);
    if (!resturent) return res.status(400).json({ error: 'Restaurant not found' });

    const order = new Order({
      customer: req.user!._id,
      ...<OrderDto>req.body,
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('customer resturent');
    res.status(200).json({ message: 'All orders', orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer resturent');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getOrderByCustomer = async (req: AuthedRequest, res: Response) => {
  try {
    const order = await Order.find({customer:req.user!._id}).populate('customer resturent');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Orders', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
}

export const getOrdersByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.params;

    // Validate state
    if (!Object.values(OrderStatesENUM).includes(state as OrderStatesENUM)) {
      return res.status(400).json({ error: 'Invalid order state' });
    }

    const orders = await Order.find({ orderStates: state }).populate('customer resturent');

    if (!orders) {
      return res.status(404).json({ message: 'No orders found with this state' });
    }

    res.status(200).json({ message: `Orders with state: ${state}`, orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getOrdersByResturent = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ resturent: req.params.resturentId }).populate('customer');
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders for this restaurant' });
    }
    res.status(200).json({ message: 'Orders for restaurant', orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('customer resturent');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};
