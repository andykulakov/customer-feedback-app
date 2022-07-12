import React from 'react';
import {render, screen} from '@testing-library/react';

import Header from '.';

describe('client/src/components/Header', () => {
    it('should display a heading', () => {
        render(<Header />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
});
