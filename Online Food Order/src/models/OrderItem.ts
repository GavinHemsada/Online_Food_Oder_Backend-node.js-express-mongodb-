import { Schema, model, Document } from "mongoose";

export interface IOrderItems extends Document{
    _id: string;
    order: any;
    food: any;
    quantity: number;
    price: number;
}

export const OrderItemsSchema = new Schema<IOrderItems>(
    {
        order: {type: Schema.Types.ObjectId, ref: "Order" },
        food: { type: Schema.Types.ObjectId, ref: "Food" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    },{
        timestamps: true
});

OrderItemsSchema.index({order: 1});
OrderItemsSchema.index({food: 1});

export const OrderItems = model<IOrderItems>("Order_Items", OrderItemsSchema);