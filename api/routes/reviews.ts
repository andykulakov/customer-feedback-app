import express from 'express';

import {deleteReviews, getReviews, populateReviews, postReview} from '../controllers/reviews';

const router = express.Router();

router.get('/', getReviews);

router.post('/new', postReview);

router.get('/delete-all', deleteReviews);

router.get('/populate', populateReviews);

export default router;
