import { Request, Response } from 'express'
import { Customer } from '@/models/Customer' 
import { CustomerDto } from '@/dto/Customer.dto'
import { AuthedRequest } from '@/middleware/JwtValidation.middleware'

export const CreateCustomer = async (req: AuthedRequest, res: Response) : Promise<any> => {
    try{
        const customer = await Customer.findOne({ user: req.user!._id });
        if(customer){ return res.status(400).json({ error: 'User already exists' }) };

        const newCustomer = new Customer({
            user: req.user!._id,
            ...<CustomerDto>req.body
        });
        await newCustomer.save();
        res.status(201).json({ message: 'User created successfully'});
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const GetCustomerDetails = async (req: AuthedRequest, res: Response) : Promise<any> => {
    try{
        const customer = await Customer.findOne({ user: req.user!._id });
        res.status(201).json({ message: "Customer details", customer });
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const GetAllCustomerDetails = async (req: Request, res: Response) : Promise<any> => {
    try{
        const customers = await Customer.find();

        return res.status(200).json(customers);
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const GetCustomerByID = async (req: Request , res: Response) : Promise<any> => {
    try{
        const  userid  = req.params.id;
        const customer = await Customer.findById(userid);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(200).json(customer);
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const UpdateCustomerDetails = async (req: AuthedRequest, res: Response) : Promise<any> => {
    try{
        const  userid  = req.user!._id;
        const updates = req.body;
        const customer = await Customer.findByIdAndUpdate(userid, updates, { new: true });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        return res.status(200).json({message: "Successfull update!", customer});
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const DeleteCustomerDetails = async (req: AuthedRequest, res: Response) : Promise<any> => {
    try{
        const  userid  = req.user!._id;
        const customer = await Customer.findByIdAndDelete(userid);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        return res.status(200).json({ message: 'Customer deleted successfully' });
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}