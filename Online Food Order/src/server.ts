import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import { UserRoute, CustomerRoute, RestaurantRoute, FoodRoute, OrderRoute, OrderItemsRoute, DeliveryRouter } from '@/routes/index';
import { protectJWT } from '@/middleware/JwtValidation.middleware';
import { DB } from './config/db';
import bodyParser from 'body-parser';

const createApp = async () => {
  await DB(); 

  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_URL }));
  app.use(express.json());
  app.use(bodyParser.json());               // For JSON input
  app.use(bodyParser.urlencoded({ extended: true })); // For x-www-form-urlencoded
  app.use(express.static('public'));
  
  app.use('/api/auth', UserRoute);
  app.use('/api/customer', protectJWT, CustomerRoute);
  app.use('/api/resturent', protectJWT, RestaurantRoute);
  app.use('/api/food', protectJWT, FoodRoute);
  app.use('/api/order', protectJWT, OrderRoute);
  app.use('/api/order', protectJWT, OrderItemsRoute);
  app.use('/api/order', protectJWT, DeliveryRouter);

  return app;
};

//  Start server
const start = async () => {
  try {
    const app = await createApp();
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
