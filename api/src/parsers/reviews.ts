import {parseAsString, parseAsNumber, safelyParseOr, parseAsArray} from '../helpers/parsing';
import {Review, DBReview} from '../types';

function getParsedReview(data: unknown): Review {
    return {
        id: safelyParseOr(data, 'id', parseAsString, ''),
        date: safelyParseOr(data, 'date', parseAsString, ''),
        name: safelyParseOr(data, 'name', parseAsString, ''),
        rating: safelyParseOr(data, 'rating', parseAsNumber, 0),
        comment: safelyParseOr(data, 'comment', parseAsString, '')
    };
}

export function getParsedReviews(data: unknown): Review[] {
    return parseAsArray(data, [] as unknown[]).map(getParsedReview);
}

export function getParsedReviewBody(body: unknown): DBReview {
    return {
        date: safelyParseOr(body, 'date', parseAsString, new Date().toISOString()),
        name: safelyParseOr(body, 'name', parseAsString, ''),
        email: safelyParseOr(body, 'email', parseAsString, ''),
        rating: safelyParseOr(body, 'rating', parseAsNumber, 0),
        comment: safelyParseOr(body, 'comment', parseAsString, '')
    };
}
