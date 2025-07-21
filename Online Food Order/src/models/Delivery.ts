import { Schema, model, Document } from "mongoose";

export enum DeliveryStatesENUM{
    Pending = "pending",
    Picked_up = "picked_up",
    Arrived = "arrived",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

export interface IDeliver extends Document{
    _id: string;
    order: any;
    states: DeliveryStatesENUM;
    estimateTime: Date;
    actualTime: Date;
}

export const DeliverySchema = new Schema<IDeliver>(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order" },
        states: { type: String, enum: Object.values(DeliveryStatesENUM), default: DeliveryStatesENUM.Pending },
        estimateTime: { type: Date, default: Date.now, required: true },
        actualTime: { type: Date, default: Date.now, required: true }
    },
    {
        timestamps: true
});

DeliverySchema.index({ order: 1 }); 
DeliverySchema.index({ states: 1 });

export const Delivery = model<IDeliver>( "Delivery", DeliverySchema );