import {Request, Response} from 'express';

import {Review} from '../models/review';
import {getParsedReviewBody, getParsedReviews} from '../parsers/reviews';
import {getMockReviews} from '../helpers/populate';

export async function getReviews(req: Request, res: Response) {
    try {
        const reviews = await Review.find().sort({date: -1}).limit(12).exec();
        const parsedReviews = getParsedReviews(reviews);
        res.json(parsedReviews);
    } catch (error) {
        res.status(500).json({
            success: false
        });
        console.error('Could not retrieve reviews.', error);
    }
}

export async function postReview(req: Request, res: Response) {
    const parsedReviewBody = getParsedReviewBody(req.body);
    const review = new Review(parsedReviewBody);

    try {
        await review.save();
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false
        });
        console.error('Could not save a review.', error);
    }
}

export async function deleteReviews(req: Request, res: Response) {
    try {
        await Review.deleteMany();
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false
        });
        console.error('Could not delete reviews.', error);
    }
}

export async function populateReviews(req: Request, res: Response) {
    const reviews = getMockReviews();

    try {
        await Review.insertMany(reviews);
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false
        });
        console.error('Could not save a review.', error);
    }
}
