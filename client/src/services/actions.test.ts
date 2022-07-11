import {getMockedDataResponse, getMockedDBReview, getMockedReview} from '../helpers/testing';
import {DataService} from './data';
import {getReviews} from './actions';

describe('client/src/services/actions', () => {
    describe('getReviews', () => {
        it('should call Data service and parse the response', async () => {
            const mockedDBReview = getMockedDBReview();
            const mockedReview = getMockedReview();
            const getReviewsDateServiceMock = jest.spyOn(DataService.prototype, 'getReviews').mockResolvedValue(getMockedDataResponse([mockedDBReview]));

            const reviews = await getReviews();

            expect(getReviewsDateServiceMock).toHaveBeenCalled();
            expect(reviews).toEqual([mockedReview]);
        });
    });
});
