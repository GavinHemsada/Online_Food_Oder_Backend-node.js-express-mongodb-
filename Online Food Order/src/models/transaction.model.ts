import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
    _id: string;
    customer: string;
    vendorId: string;
    orderId: string;
    orderValue: number;
    offerUsed: string;
    status: string;
    paymentMode: string;
    paymentResponse: string;

}

const TransactionSchema = new Schema({
    customer: String,
    vendorId: String,
    orderId: String,
    orderValue: Number,
    offerUsed: String,
    status: String,
    paymentMode: String,
    paymentResponse: String
 
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});


const Transaction = mongoose.model<ITransaction>('transaction', TransactionSchema);

export { Transaction }
