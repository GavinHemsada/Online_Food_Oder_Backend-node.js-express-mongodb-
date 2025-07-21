import express from 'express';
import { CreateCustomer, 
    GetAllCustomerDetails, 
    GetCustomerByID, 
    UpdateCustomerDetails, 
    DeleteCustomerDetails,
    GetCustomerDetails }  from '@/controllers/Customer.controller';
import { validateDto } from '@/middleware/ValidateDTO.middleware';
import { CustomerDto } from '@/dto/Customer.dto';

const router = express.Router();

router.get("/getAllCustomers", GetAllCustomerDetails);
router.get("/getCustomerByID/:id", GetCustomerByID);
router.get("/me", GetCustomerDetails)
router.post("/create", validateDto(CustomerDto), CreateCustomer );
router.put("/update", validateDto(CustomerDto), UpdateCustomerDetails );
router.delete('/delete', DeleteCustomerDetails)

export { router as CustomerRoute };