import { Request, NextFunction, Response } from 'express'
import {AuthPayload } from '../dto/auth.dto'
import { ValidateSignature } from '../utility/PasswordUnility';

declare global {
    namespace Express{
        interface Request{
            user?: AuthPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) :Promise<any>=> {

    const signature = await ValidateSignature(req);
    if(signature){
        return next()
    }else{
        return res.json({message: "User Not authorised"});
    }
}