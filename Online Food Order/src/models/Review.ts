import { Schema, model, Document, Types } from "mongoose";

export interface IReview extends Document{
    _id: string;
    order: any;
    customer: any;
    resturent: any;
    comment: string;
    rate: number
}

export const ReviewSchema = new Schema<IReview>(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order" },
        customer: { type: Schema.Types.ObjectId, ref: "Customer" },
        resturent: { type: Schema.Types.ObjectId, ref: "Resturent" },
        comment: { type: String, required : true },
        rate: { type: Number, required: true, min: 1, max: 5 }
    },{
        timestamps: true
});

ReviewSchema.index({order: 1});
ReviewSchema.index({customer: 1});
ReviewSchema.index({resturent: 1});

export const Review = model<IReview>( "Review", ReviewSchema);