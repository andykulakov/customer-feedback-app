import {getDataService} from './data';
import {Review} from '../types/reviews';
import {ReviewForm} from '../types/forms';
import {getParsedReviews} from './parsers';

export function getReviews(): Promise<Review[] | void> {
    return getDataService()
        .getReviews()
        .then(reviews => {
            return getParsedReviews(reviews);
        })
        .catch(error => {
            console.error('Error in getReviews action.', error);
        });
}

export function postReview(body: ReviewForm): Promise<void> {
    return getDataService()
        .postReview(body)
        .catch(error => {
            return Promise.reject(`Error in postReview action. ${error}`);
        });
}
