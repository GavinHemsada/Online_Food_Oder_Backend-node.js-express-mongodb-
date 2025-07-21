import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewsByResturent,
  updateReview,
  deleteReview
} from '@/controllers/Review.controller';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/resturent/:resturentId', getReviewsByResturent);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export { router as ReviwRouter };
