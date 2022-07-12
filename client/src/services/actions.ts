import {getDataService} from './data';
import {Review} from '../types/reviews';
import {getParsedReviews} from './parsers';

export function getReviews(): Promise<Review[] | void> {
    return getDataService()
        .getReviews()
        .then(reviews => {
            return getParsedReviews(reviews);
        })
        .catch(error => {
            console.error('Error in getReviews action:', error);
        });
}
