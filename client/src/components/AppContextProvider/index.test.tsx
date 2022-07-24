import React, {useContext} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {getMockedReview} from '../../helpers/testing';

import AppContextProvider, {AppContext} from '.';

describe('client/src/components/AppContextProvider', () => {
    const mockedReview = getMockedReview();
    const ContextConsumer: React.FC = () => {
        const {data, setData} = useContext(AppContext);
        const handleClick = () => {
            setData({
                reviews: [mockedReview]
            });
        };

        return (
            <div>
                {data.reviews.map(review => (
                    <p key={review.id}>{review.name}</p>
                ))}
                <button onClick={handleClick}>Set data</button>
            </div>
        );
    };

    it('should set data when the function is triggered from a consumer and display the data', async () => {
        render(
            <AppContextProvider>
                <ContextConsumer />
            </AppContextProvider>
        );

        expect(screen.queryByText(mockedReview.name)).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button'));

        expect(screen.getByText(mockedReview.name)).toBeInTheDocument();
    });
});
