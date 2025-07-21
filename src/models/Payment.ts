import { Schema, model, Document } from "mongoose";

export enum PaymentMethordsENUM {
    Card = 'card',
    Cash = 'cash'
}

export enum PaymentStatesENUM {
    Paid = "paid",
    Failed = "failed",
    Pending = "pending"
}

export interface IPayemnt extends Document{
    _id: string;
    order: any;
    customer: any;
    methord: PaymentMethordsENUM;
    paymentDate: Date;
    states: PaymentStatesENUM;
    amount: number;
}

export const PaymentSchema = new Schema<IPayemnt>(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order" },
        customer: { type: Schema.Types.ObjectId, ref: "Customer" },
        methord: { type: String, enum: Object.values(PaymentMethordsENUM), default: PaymentMethordsENUM.Card },
        paymentDate: { type: Date, default: Date.now, required:true },
        states: { type: String, enum: Object.values(PaymentStatesENUM), default: PaymentStatesENUM.Pending },
        amount: { type: Number, required: true }
    },{
        timestamps: true
});

PaymentSchema.index({order: 1});
PaymentSchema.index({customer: 1});
PaymentSchema.index({methord: 1});

export const Payment = model<IPayemnt>( "Payment", PaymentSchema);