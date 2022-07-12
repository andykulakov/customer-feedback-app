import React from 'react';

import {getArrayFromLength} from '../../../helpers';
import {Review} from '../../../types/reviews';

import Star from '../../Star';

import styles from './index.module.css';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({review}) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.heading}>{review.name}</h3>
            <p className={styles.rating}>
                <span aria-hidden={true}>
                    {getArrayFromLength(review.rating).map(rate => (
                        <Star key={rate} className={styles.star} />
                    ))}
                </span>
                <span className={styles.ratingLabel}>{review.rating} stars</span>
            </p>
            <p>{review.comment}</p>
        </div>
    );
};

export default ReviewCard;
