import express, { Request, Response ,Application} from "express";
import dotenv from "dotenv";
import 'reflect-metadata';
import path from 'path';
dotenv.config();
import db from './config/db'
import { AdminRoute, VandorRoute, CustomerRoute, DeliveryRoute, ShoppingRoute } from './routes/router';

const app: Application = express(); 
const Start = async() => {
    app.use(express.json());
    await db();

    const PORT = process.env.PORT;
    const imagePath = path.join(__dirname,'../images');
    
    app.use('/images', express.static(imagePath));
    app.use('/admin', AdminRoute);
    app.use('/vendor', VandorRoute)
    app.use('/customer', CustomerRoute)
    app.use('/delivery', DeliveryRoute);
    app.use('/shopping',ShoppingRoute);

    app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
    });

    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
}
Start();

