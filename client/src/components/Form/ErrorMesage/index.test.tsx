import React from 'react';
import {render, screen} from '@testing-library/react';

import ErrorMessage from '.';

describe('client/src/components/Form/ErrorMessage', () => {
    it('should display a message', () => {
        render(<ErrorMessage id="id">Error Message</ErrorMessage>);

        expect(screen.getByText('Error Message')).toBeInTheDocument();
    });
});
