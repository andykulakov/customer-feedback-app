import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';

import * as actionsModule from '../../services/actions';
import {getMockedReview} from '../../helpers/testing';

import AppContextProvider from '../AppContextProvider';
import Main from '.';

describe('client/src/components/Main', () => {
    const mockedReview = getMockedReview();

    it('should fetch data and update the context after the component is mounted', async () => {
        let getReviewsMock = jest.spyOn(actionsModule, 'getReviews').mockResolvedValue([mockedReview]);
        render(
            <AppContextProvider>
                <Main />
            </AppContextProvider>
        );

        expect(getReviewsMock).toHaveBeenCalled();
        await waitFor(() => expect(screen.getByText(mockedReview.name)).toBeInTheDocument());
    });
});
