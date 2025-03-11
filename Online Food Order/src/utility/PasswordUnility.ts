import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { AuthPayload } from '../dto/auth.dto';

dotenv.config();
const APP_SECRET = process.env.APP_SECRET;

if (!APP_SECRET) {
    throw new Error("❌ MONGO_URI is not defined in the .env file!");
  }

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()    
}


export const GeneratePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = async (payload: AuthPayload) => {

   return jwt.sign(payload, APP_SECRET, { expiresIn: '90d'});

}

export const ValidateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload; 
            (req as any).user = payload;
            return true;

        } catch(err){
            return false
        } 
    }
    return false
};

export const GenerateOtp = () => {

    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return {otp, expiry};
}

export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {

    try {
        const accountSid = "Your Account SID from TWILIO DASHBOARD";
        const authToken = "YOUR AUTH TOKEN AS I SAID ON VIDEO";
        const client = require('twilio')(accountSid, authToken);
    
        const response = await client.message.create({
            body: `Your OTP is ${otp}`,
            from: 'Your TWILIO PHONE NUMBER YOU CAN GET IT FROM YOUR DASHBOARD',
            to: `recipient_countrycode${toPhoneNumber}` // recipient phone number // Add country before the number
        })
    
        return response;
    } catch (error){
        return false
    }
    
}
