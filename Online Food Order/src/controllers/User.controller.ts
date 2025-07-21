import { Request, Response } from 'express'
import { RegisterDto, LoginDTO } from '@/dto/User.dto';
import { User } from '@/models/User';
import  Jwt  from 'jsonwebtoken';

export const Login = async ( req: Request, res: Response ) : Promise<any> => {
    try{
        const { email, password } = <LoginDTO>req.body;
        const user = await User.findOne({ email });

        if(!user){ return res.status(400).json({ error: 'Invalid credentials' }); }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) { return res.status(400).json({ error: 'Invalid credentials' }); }

        const token = Jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
        );

        res.json({ message: 'Login successful', token });

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

export const Register  = async ( req: Request, res: Response ) : Promise<any> => {
    try{
        const { email, password } = <RegisterDto>req.body;
        const user = await User.exists({ email });

        if(user){ return res.status(400).json({ error: 'User already exists' }); }

        const newuser = new User({ email, password });

        await newuser.save();

        res.status(201).json({ message: 'User created successfully'});

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}