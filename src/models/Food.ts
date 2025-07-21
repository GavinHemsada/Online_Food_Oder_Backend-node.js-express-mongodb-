import { Schema, model, Document } from "mongoose";

export interface IFood extends Document{
    _id: string;
    resturent: any;
    name: string;
    description: string;
    price: number;
    images: string[];
}

const FoodSchema = new Schema<IFood>(
    {
        resturent: { type: Schema.Types.ObjectId, ref: "Resturent" },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{type: String }]
    },{
        timestamps: true
});

FoodSchema.index({ resturent: 1 }); 

export const Food = model<IFood>( "Food", FoodSchema )