import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';

import * as actionsModule from '../../services/actions';
import {getMockedReview} from '../../helpers/testing';

import AppContextProvider from '../AppContextProvider';
import Main from '.';

describe('client/src/components/Main', () => {
    const mockedReview = getMockedReview();

    it('should fetch data and update the context after the component is mounted', async () => {
        const getReviewsMock = jest.spyOn(actionsModule, 'getReviews').mockResolvedValue([mockedReview]);
        render(
            <AppContextProvider>
                <Main />
            </AppContextProvider>
        );

        await waitFor(() => expect(getReviewsMock).toHaveBeenCalled());
        expect(await screen.findByText(mockedReview.name)).toBeInTheDocument();
    });
});
