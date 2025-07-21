import { Schema, model, Document } from 'mongoose';

export interface IResturent extends Document{
    _id: string;
    user: any;
    name: string;
    ownerName: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    phone: string;
    foodType: string;
    images: string;
}

const ResturentSchema = new Schema<IResturent>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
        name: { type: String, required: true },
        ownerName: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city:   { type: String, required: true },
            state:  { type: String, required: true },
            zipCode:{ type: String, required: true },
            country:{ type: String, required: true },
        },
        phone: { type: String, required: true },
        foodType: { type: String, required: true },
        images: { type: String }
    },
    {
    timestamps: true
});

export const Resturent = model<IResturent>("Resturent", ResturentSchema);