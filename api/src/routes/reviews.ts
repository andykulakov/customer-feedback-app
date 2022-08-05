import express from 'express';

import {deleteReviews, getReviews, populateReviews, postReview} from '../controllers/reviews';

const router = express.Router();

router.get('/', getReviews);

router.post('/', postReview);

router.delete('/', deleteReviews);

router.post('/populate', populateReviews);

export default router;
