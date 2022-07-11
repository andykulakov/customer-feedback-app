import {DBResponse} from '../types';
import {DBReview, Review, ReviewForm} from '../types/reviews';

export function getMockedDataResponse<T>(response: T): DBResponse<T> {
    return {
        data: response
    };
}

export function getMockedDBReview(overrides?: Partial<DBReview>): DBReview {
    return {
        id: '1',
        date: '2022-07-10T18:43:56.585Z',
        name: 'Test Name',
        rating: 5,
        comment: 'Test Comment',
        createdAt: '2022-07-10T18:43:56.585Z',
        updatedAt: '2022-07-10T18:43:56.585Z',
        ...overrides
    };
}

export function getMockedReview(overrides?: Partial<Review>): Review {
    return {
        id: '1',
        date: '2022-07-10T18:43:56.585Z',
        name: 'Test Name',
        rating: 5,
        comment: 'Test Comment',
        ...overrides
    };
}

export function getMockedReviewForm(overrides?: Partial<ReviewForm>): ReviewForm {
    return {
        name: 'Test Name',
        email: 'test@test.com',
        rating: 5,
        comment: 'Test Comment',
        ...overrides
    };
}
