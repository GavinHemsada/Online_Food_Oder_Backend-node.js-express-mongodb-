import express, { Request, Response, NextFunction } from 'express';
import shopping from '../controllers/shopping.controller';

const router = express.Router();

/* ------------------- Food Availability --------------------- */
router.get('/:pincode', shopping.GetFoodAvailability )

/* ------------------- Top Restaurant --------------------- */
router.get('/top-restaurant/:pincode', shopping.GetTopRestaurants)

/* ------------------- Food Available in 30 Minutes --------------------- */
router.get('/foods-in-30-min/:pincode', shopping.GetFoodsIn30Min)

/* ------------------- Search Foods --------------------- */
router.get('/search/:pincode', shopping.SearchFoods)


/* ------------------- Search Offers --------------------- */
router.get('/offers/:pincode', shopping.GetAvailableOffers)


/* ------------------- Find Restaurant by ID --------------------- */
router.get('/restaurant/:id', shopping.RestaurantById)

export { router as ShoppingRoute}