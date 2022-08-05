import {Schema, Model, model} from 'mongoose';

import {DBReview} from '../types';

type DBReviewModel = Model<DBReview>;

const reviewSchema = new Schema<DBReview, DBReviewModel>(
    {
        date: {
            type: String,
            default: () => new Date().toISOString()
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

export const Review = model<DBReview, DBReviewModel>('Review', reviewSchema);
