import { Schema ,model, Document } from "mongoose";

export enum OrderStatesENUM {
    Pending = 'pending',
    Confirmed = 'confirmed',
    Preparing = 'preparing',
    Ready = 'ready',
    Delivered = 'delivered',
    Cancelled = 'cancelled'
}

export interface IOrder extends Document{
    _id: string;
    customer: any;
    resturent: any;
    amount: number;
    orderStates: OrderStatesENUM;
    orderDate: Date;
}

export const OrderSchema = new Schema<IOrder>(
    {
        customer: { type: Schema.Types.ObjectId, ref: "Customer" },
        resturent: { type: Schema.Types.ObjectId, ref: "Resturent" },
        amount: { type: Number, required: true },
        orderStates: { type: String, enum: Object.values(OrderStatesENUM), default: OrderStatesENUM.Pending },
        orderDate: { type: Date, required: true, default: Date.now }
    },{
        timestamps: true
});

OrderSchema.index({customer: 1});
OrderSchema.index({resturent: 1});
OrderSchema.index({orderStates: 1});

export const Order = model<IOrder>( "Order", OrderSchema);