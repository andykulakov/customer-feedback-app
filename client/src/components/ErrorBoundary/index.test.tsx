import React from 'react';
import {render, screen} from '@testing-library/react';

import ErrorBoundary from '.';

describe('client/src/components/ErrorBoundary', () => {
    const ChildWithoutError: React.FC = () => {
        return <p>No Error</p>;
    };
    const ChildWithError: React.FC = () => {
        throw new Error('Error from ChildWithError');
    };

    it('should display children if there is no error', () => {
        render(
            <ErrorBoundary>
                <ChildWithoutError />
            </ErrorBoundary>
        );

        expect(screen.getByText('No Error')).toBeInTheDocument();
    });

    it('should display an error message if there is an error', () => {
        render(
            <ErrorBoundary>
                <ChildWithError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Error from ChildWithError')).toBeInTheDocument();
    });
});
