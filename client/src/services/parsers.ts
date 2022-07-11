import {parseAsArray, parseAsNumber, parseAsString, safelyParseOr} from '../helpers/parsing';
import {Review} from '../types/reviews';

function getParsedReview(data: unknown): Review {
    return {
        id: safelyParseOr(data, 'id', parseAsString, ''),
        date: safelyParseOr(data, 'date', parseAsString, ''),
        name: safelyParseOr(data, 'name', parseAsString, ''),
        rating: safelyParseOr(data, 'rating', parseAsNumber, 0),
        comment: safelyParseOr(data, 'comment', parseAsString, '')
    };
}

export function getParsedReviews(response: unknown): Review[] {
    return safelyParseOr(response, 'data', parseAsArray, [] as unknown[]).map(getParsedReview);
}
