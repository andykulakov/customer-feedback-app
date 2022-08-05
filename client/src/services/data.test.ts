import axios from 'axios';

import {getMockedDataResponse, getMockedDBReview, getMockedReviewForm} from '../helpers/testing';
import {getDataService, API_REVIEWS_URL} from './data';

describe('client/src/services/data', () => {
    describe('getReviews', () => {
        it("should get data from '/reviews' endpoint", async () => {
            const mockedDBReview = getMockedDBReview();
            const getAxiosGetMock = jest.spyOn(axios, 'get').mockResolvedValue(getMockedDataResponse([mockedDBReview]));

            const reviews = await getDataService().getReviews();

            expect(getAxiosGetMock).toHaveBeenCalledWith(API_REVIEWS_URL);
            expect(reviews).toEqual(getMockedDataResponse([mockedDBReview]));
        });
    });

    describe('postReview', () => {
        it("should post data to '/reviews' endpoint", async () => {
            const mockedReviewBody = getMockedReviewForm();
            const getAxiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue(
                getMockedDataResponse({
                    success: true
                })
            );

            await getDataService().postReview(mockedReviewBody);

            expect(getAxiosPostMock).toHaveBeenCalledWith(API_REVIEWS_URL, mockedReviewBody);
        });
    });
});
