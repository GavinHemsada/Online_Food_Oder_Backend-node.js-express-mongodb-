import { Request, Response } from 'express';
import { Delivery } from '@/models/Delivery';
import { Order } from '@/models/Order';
import { DeliveryDTO, DeliveryStatesENUM } from '@/dto/Delivery.dto';

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const orderExists = await Order.findById(req.body.order);
    if (!orderExists) {
      return res.status(400).json({ error: 'Order not found' });
    }

    const delivery = new Delivery({ ...<DeliveryDTO>req.body });

    await delivery.save();

    res.status(201).json({ message: 'Delivery created', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getAllDeliveries = async (_req: Request, res: Response) => {
  try {
    const deliveries = await Delivery.find().populate('order');
    res.status(200).json({ message: 'All deliveries', deliveries });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getDeliveryById = async (req: Request, res: Response) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('order');
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json({ message: 'Delivery found', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getDeliveriesByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.params;

    if (!Object.values(DeliveryStatesENUM).includes(state as DeliveryStatesENUM)) {
      return res.status(400).json({ error: 'Invalid delivery state' });
    }

    const deliveries = await Delivery.find({ states: state }).populate('order');
    res.status(200).json({ message: `Deliveries with state: ${state}`, deliveries });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  try {
    const updateData: Partial<DeliveryDTO> = req.body;

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('order');

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json({ message: 'Delivery updated', delivery });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json({ message: 'Delivery deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};
