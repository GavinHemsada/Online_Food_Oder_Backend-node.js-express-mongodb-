import express, { Request, Response, NextFunction } from 'express';
import delivery from '../controllers/delivery.controller';
// import { Authenticate } from '../middleware';


const router = express.Router();

/* ------------------- Signup / Create Customer --------------------- */
router.post('/signup', delivery.DeliverySignUp)

/* ------------------- Login --------------------- */
router.post('/login', delivery.DeliveryLogin)

/* ------------------- Authentication --------------------- */
// router.use(Authenticate);

/* ------------------- Change Service Status --------------------- */
router.put('/change-status', delivery.UpdateDeliveryUserStatus);

/* ------------------- Profile --------------------- */
router.get('/profile', delivery.GetDeliveryProfile)
router.patch('/profile', delivery.EditDeliveryProfile)


export { router as DeliveryRoute}