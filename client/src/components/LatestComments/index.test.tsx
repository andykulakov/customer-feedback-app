import React from 'react';
import {render, screen} from '@testing-library/react';

import {AppContextData} from '../../types';

import {AppContext} from '../AppContextProvider';

import LatestComments from '.';
import {getMockedReview} from '../../helpers/testing';

describe('client/src/components/LatestComments', () => {
    const contextData: AppContextData = {
        data: {
            reviews: [getMockedReview(), getMockedReview({id: '2'})]
        },
        setData: () => {
            return;
        }
    };

    it('should display a heading', () => {
        render(
            <AppContext.Provider value={contextData}>
                <LatestComments />
            </AppContext.Provider>
        );

        expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
    });

    it('should display a card with a heading for each review', () => {
        render(
            <AppContext.Provider value={contextData}>
                <LatestComments />
            </AppContext.Provider>
        );

        expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(contextData.data.reviews.length);
    });

    it('should display the placeholder if there are no reviews', () => {
        const contextDataWithoutReviews: AppContextData = {
            ...contextData,
            data: {
                reviews: []
            }
        };
        render(
            <AppContext.Provider value={contextDataWithoutReviews}>
                <LatestComments />
            </AppContext.Provider>
        );

        expect(screen.getByText('No comments yet.')).toBeInTheDocument();
    });
});
