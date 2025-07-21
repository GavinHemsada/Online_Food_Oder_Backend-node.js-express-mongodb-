import { Request, Response } from 'express';
import { Review } from '@/models/Review';
import { ReviewDTO } from '@/dto/Review.dto';
import { Order } from '@/models/Order';
import { Resturent } from '@/models/Resturent';

export const createReview = async (req: Request, res: Response) => {
  try {
    const orderExists = await Order.findById(req.body.order);
    const resturentExists = await Resturent.findById(req.body.resturent);

    if (!orderExists || !resturentExists) {
      return res.status(400).json({ error: 'Order or Restaurant not found' });
    }

    const review = new Review({ ...<ReviewDTO>req.body });
    await review.save();

    res.status(201).json({ message: 'Review created', review });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate('customer resturent order');
    res.status(200).json({ message: 'All reviews', reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const getReviewsByResturent = async (req: Request, res: Response) => {
  try {
    const { resturentId } = req.params;
    const reviews = await Review.find({ resturent: resturentId }).populate('customer order');

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews for this restaurant' });
    }

    res.status(200).json({ message: 'Restaurant reviews', reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: String(error) });
  }
};
