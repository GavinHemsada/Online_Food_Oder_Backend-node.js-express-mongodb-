import express, { Request, Response, NextFunction } from 'express';
import CustomerController from '../controllers/customer.controller';
// import { Authenticate } from '../middleware';

const router = express.Router();

/* ------------------- Suignup / Create Customer --------------------- */
router.post('/signup', CustomerController.CustomerSignUp)

/* ------------------- Login --------------------- */
router.post('/login', CustomerController.CustomerLogin)

/* ------------------- Authentication --------------------- */
// router.use(Authenticate);

/* ------------------- Verify Customer Account --------------------- */
router.patch('/verify', CustomerController.CustomerVerify)


/* ------------------- OTP / request OTP --------------------- */
router.get('/otp', CustomerController.RequestOtp)

/* ------------------- Profile --------------------- */
router.get('/profile', CustomerController.GetCustomerProfile)
router.patch('/profile', CustomerController.EditCustomerProfile)

//Cart
router.post('/cart', CustomerController.AddToCart)
router.get('/cart', CustomerController.GetCart)
router.delete('/cart', CustomerController.DeleteCart)


//Apply Offers
router.get('/offer/verify/:id', CustomerController.VerifyOffer);


//Payment
router.post('/create-payment', CustomerController.CreatePayment);


//Order
router.post('/create-order', CustomerController.CreateOrder);
router.get('/orders', CustomerController.GetOrders);
router.get('/order/:id', CustomerController.GetOrderById)

export { router as CustomerRoute}