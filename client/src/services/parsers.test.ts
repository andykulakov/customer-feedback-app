import {getParsedReviews} from './parsers';
import {getMockedDataResponse, getMockedDBReview, getMockedReview} from '../helpers/testing';

describe('client/src/services/parsers', () => {
    describe('getParsedReviews', () => {
        it('should return correctly parsed reviews', () => {
            const dataResponse = getMockedDataResponse([
                getMockedDBReview(),
                getMockedDBReview({
                    id: '2'
                })
            ]);
            const parsedReviews = getParsedReviews(dataResponse);

            expect(parsedReviews).toEqual([getMockedReview(), getMockedReview({id: '2'})]);
        });
    });
});
