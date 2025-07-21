import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
    _id: string;
    user: any;
    first_name: string;
    last_name: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

const CustomerSchema = new Schema<ICustomer>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type:String, required:true },
    address: {
      street: { type: String, required: true },
      city:   { type: String, required: true },
      state:  { type: String, required: true },
      zipCode:{ type: String, required: true },
      country:{ type: String, required: true },
    }
  },
  { 
    timestamps: true
});

export const Customer = model<ICustomer>('Customer', CustomerSchema);