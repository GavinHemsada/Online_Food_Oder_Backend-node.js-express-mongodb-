
import { Request, Response ,NextFunction } from 'express';
import { CreateVendorInput, CreateOfferInputs, EditVendorInput, VendorLoginInput } from '../dto/vendor.dto'
import { Food } from '../models/food.model';
import { Offer }  from '../models/offer.model';
import { Order }  from '../models/order.model';
import { GenerateSignature, ValidatePassword } from '../utility/PasswordUnility';
import { FindVendor } from './admin.controller';


const VendorLogin = async (req: Request,res: Response, next: NextFunction) :Promise<any> => {

    const { email, password } = <VendorLoginInput>req.body;

    const existingUser = await FindVendor('', email);

    if(existingUser !== null){

        const validation = await ValidatePassword(password, existingUser.password, existingUser.salt);
        if(validation){

            const signature = await GenerateSignature({
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name
            })
            return res.json(signature);
        }
    }

    return res.json({'message': 'Login credential is not valid'})

}



const GetVendorProfile = async (req: Request,res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;
     
    if(user){

       const existingVendor = await FindVendor(user._id);
       return res.json(existingVendor);
    }

    return res.json({'message': 'vendor Information Not Found'})
}



const UpdateVendorProfile = async (req: Request,res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;

    const { foodType, name, address, phone} = <EditVendorInput>req.body;
     
    if(user){

       const existingVendor = await FindVendor(user._id);

       if(existingVendor !== null){

            existingVendor.name = name;
            existingVendor.address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
            const saveResult = await existingVendor.save();

            return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})

}



const UpdateVendorCoverImage = async (req: Request,res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;

     if(user){

       const vendor = await FindVendor(user._id);

       if(vendor !== null){

            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);

            vendor.coverImages.push(...images);

            const saveResult = await vendor.save();
            
            return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})

}

const UpdateVendorService = async (req: Request,res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;

    const { lat, lng} = req.body;
     
    if(user){

       const existingVendor = await FindVendor(user._id);

       if(existingVendor !== null){

            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            if(lat && lng){
                existingVendor.lat = lat;
                existingVendor.lng = lng;
            }
            const saveResult = await existingVendor.save();

            return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})

}


const AddFood = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput>(req as any).body;
     
    if(user){

       const vendor = await FindVendor(user._id);

       if(vendor !== null){

            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);
            
            const food = await Food.create({
                vendorId: vendor._id,
                name: name,
                address: address,
                pincode: pincode,
                email: email,
                rating: 0,
                password: password,
                foodType: foodType,
                ownerName:ownerName,
                phone:phone,
                images: images
            })
            
            vendor.foods.push(food);
            const result = await vendor.save();
            return res.json(result);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})
}

const GetFoods = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const user = (req as any).user;
 
    if(user){

       const foods = await Food.find({ vendorId: user._id});

       if(foods !== null){
            return res.json(foods);
       }

    }
    return res.json({'message': 'Foods not found!'})
}


const GetCurrentOrders = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const user = (req as any).user;
    
    if(user){

        const orders = await Order.find({ vendorId: user._id}).populate('items.food');

        if(orders != null){
            return res.status(200).json(orders);
        }
    }

    return res.json({ message: 'Orders Not found'});
}

const GetOrderDetails = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const orderId = (req as any).params.id;
    
    if(orderId){

        const order = await Order.findById(orderId).populate('items.food');

        if(order != null){
            return res.status(200).json(order);
        }
    }

    return res.json({ message: 'Order Not found'});
}

const ProcessOrder = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {

    const orderId = (req as any).params.id;

    const { status, remarks, time } = (req as any).body;
    if(orderId){

        const order = await Order.findById(orderId).populate('food');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.orderStatus = status;
        order.remarks = remarks;
        if(time){
            order.readyTime = time;
        }

        const orderResult = await order.save();

        if(orderResult != null){
            return res.status(200).json(orderResult);
        }
    }

    return res.json({ message: 'Unable to process order'});
}

const GetOffers = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {


    const user = (req as any).user;

    if(user){
        let currentOffer = Array();

        const offers = await Offer.find().populate('vendors');

        if(offers){


            offers.map(item => {

                if(item.vendors){
                    item.vendors.map(vendor => {
                        if(vendor._id.toString() === user._id){
                            currentOffer.push(item);
                        }
                    })
                }

                if(item.offerType === "GENERIC"){
                    currentOffer.push(item)
                }

            })

        }

        return res.status(200).json(currentOffer);

    }

    return res.json({ message: 'Offers Not available'});
}


const AddOffer = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {


    const user = (req as any).user;

    if(user){
        const { title, description, offerType, offerAmount, pincode,
        promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <CreateOfferInputs>req.body;

        const vendor = await FindVendor(user._id);

        if(vendor){

            const offer = await Offer.create({
                title,
                description,
                offerType,
                offerAmount,
                pincode,
                promoType,
                promocode,
                bins,
                startValidity,
                endValidity,
                bank,
                isActive,
                minValue,
                vendor:[vendor]
            })

            console.log(offer);

            return res.status(200).json(offer);

        }

    }

    return res.json({ message: 'Unable to add Offer!'});

    

}

const EditOffer = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {


    const user = (req as any).user;
    const offerId = req.params.id;

    if(user){
        const { title, description, offerType, offerAmount, pincode,
        promocode, promoType, startValidity, endValidity, bank, bins, minValue, isActive } = <CreateOfferInputs>req.body;

        const currentOffer = await Offer.findById(offerId);

        if(currentOffer){

            const vendor = await FindVendor(user._id);

            if(vendor){
           
                currentOffer.title = title,
                currentOffer.description = description,
                currentOffer.offerType = offerType,
                currentOffer.offerAmount = offerAmount,
                currentOffer.pincode = pincode,
                currentOffer.promocode = promocode,
                currentOffer.promoType = promoType,
                currentOffer.startValidity = startValidity,
                currentOffer.endValidity = endValidity,
                currentOffer.bank = bank,
                currentOffer.bins = bins,
                currentOffer.isActive = isActive,
                currentOffer.minValue = minValue;

                const result = await currentOffer.save();

                return res.status(200).json(result);
            }
            
        }

    }

    return res.json({ message: 'Unable to add Offer!'});    

}


const vendorController = {AddFood, AddOffer, EditOffer, GetFoods, GetOffers, GetOrderDetails, GetCurrentOrders, ProcessOrder, UpdateVendorCoverImage, UpdateVendorProfile, UpdateVendorService, VendorLogin}
export default vendorController