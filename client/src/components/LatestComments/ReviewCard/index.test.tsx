import React from 'react';
import {render, screen} from '@testing-library/react';

import {getMockedReview} from '../../../helpers/testing';

import ReviewCard from '.';

describe('client/src/components/LatestComments/ReviewCard', () => {
    const mockedReview = getMockedReview();

    it('should display the heading', () => {
        render(<ReviewCard review={mockedReview} />);

        expect(screen.getByRole('heading')).toHaveTextContent(mockedReview.name);
    });

    it('should display the rating', () => {
        render(<ReviewCard review={mockedReview} />);

        expect(screen.getByText(`${mockedReview.rating} stars`)).toBeInTheDocument();
    });

    it('should display the comment', () => {
        render(<ReviewCard review={mockedReview} />);

        expect(screen.getByText(mockedReview.comment)).toBeInTheDocument();
    });
});
