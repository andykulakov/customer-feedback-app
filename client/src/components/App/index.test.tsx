import React from 'react';
import {render, screen} from '@testing-library/react';

import App from '.';

describe('client/src/components/App', () => {
    it('should display a header element', () => {
        render(<App />);

        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should display a main element', () => {
        render(<App />);

        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
