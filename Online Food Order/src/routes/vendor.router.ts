import express, { Request, Response, NextFunction } from 'express';
import vendor from '../controllers/vendor.controller';
import { Authenticate } from '../middleware/CommonAuth';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'images')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+'_'+file.originalname);
    }
})

const images = multer({ storage: imageStorage}).array('images', 10);


router.get('/login', vendor.VendorLogin);

router.use(Authenticate)
router.get('/profile', vendor.VendorLogin);
router.patch('/profile', vendor.UpdateVendorProfile);
router.patch('/coverimage', images,vendor.UpdateVendorCoverImage);
router.patch('/service', vendor.UpdateVendorService);

router.post('/food', images,vendor.AddFood);
router.get('/food', vendor.GetFoods)


router.get('/orders', vendor.GetCurrentOrders);
router.put('/order/:id/process', vendor.ProcessOrder);
router.get('/order/:id', vendor.GetOrderDetails)
 

//Offers
router.get('/offers', vendor.GetOffers);
router.post('/offer', vendor.AddOffer);
router.put('/offer/:id', vendor.EditOffer)
 


router.get('/', (req: Request, res: Response, next: NextFunction) => {
 
res.json({ message: "Hello from Vandor"})

})



export { router as VandorRoute };