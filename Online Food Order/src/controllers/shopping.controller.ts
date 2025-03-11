import express, { Request, Response, NextFunction } from 'express';
import {IFood} from '../models/food.model';
import {Vendor}  from '../models/vendor.model';
import {Offer}  from '../models/offer.model';

const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const pincode = req.params.pincode;
    
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: true}).sort([['rating', 'descending']]).populate('foods')

    if(result.length > 0){
        return res.status(200).json(result);
    }

    return res.status(404).json({ msg: 'data Not found!'});

}

const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const pincode = req.params.pincode;
    
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: true}).sort([['rating', 'descending']]).limit(10)

    if(result.length > 0){
        return res.status(200).json(result);
    }
    
    return res.status(404).json({ msg: 'data Not found!'});
}

const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const pincode = req.params.pincode;
    
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: true}).sort([['rating', 'descending']]).populate('foods');
 
    if(result.length > 0){
        let foodResult: any = [];
        result.map(vendor => {
            const foods = vendor.foods as [IFood];
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        })
        return res.status(200).json(foodResult);
    }
    
    return res.status(404).json({ msg: 'data Not found!'});
}

const SearchFoods = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const pincode = req.params.pincode;
    const result = await Vendor.find({ pincode: pincode, serviceAvailable: true})
    .populate('foods');
 
    if(result.length > 0){
        let foodResult: any = [];
        result.map(item => foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }
    return res.status(404).json({ msg: 'data Not found!'});
}

const RestaurantById = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const id = req.params.id;
    
    const result = await Vendor.findById(id).populate('foods')
    
    if(result){
        return res.status(200).json(result);
    }

    return res.status(404).json({ msg: 'data Not found!'});
}


const GetAvailableOffers = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const pincode = req.params.pincode;

    const offers = await Offer.find({ pincode: pincode, isActive: true});

    if(offers){
        return res.status(200).json(offers);
    }
    
    return res.json({ message: 'Offers not Found!'});
}

const shoppingController = {GetAvailableOffers, GetFoodAvailability, GetFoodsIn30Min, GetTopRestaurants, RestaurantById, SearchFoods}
export default shoppingController;