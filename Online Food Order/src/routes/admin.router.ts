import express, { Request, Response, NextFunction } from 'express';
import Admin  from '../controllers/admin.controller';


const router = express.Router();

router.post('/vendor', Admin.CreateVandor)

router.get('/vendors', Admin.GetVanndors)
router.get('/vendor/:id', Admin.GetVandorByID)


router.get('/transactions', Admin.GetTransactions)
router.get('/transaction/:id', Admin.GetTransactionById)

router.put('/delivery/verify', Admin.VerifyDeliveryUser)
router.get('/delivery/users', Admin.GetDeliveryUsers);


router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from  Admin"})
})

export { router as AdminRoute };