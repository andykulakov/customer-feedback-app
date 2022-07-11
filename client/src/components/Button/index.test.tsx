import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import Button from '.';

describe('client/src/components/Button', () => {
    it('should display children', () => {
        render(<Button type="button">Test Text</Button>);

        expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('should call the passed function on click', () => {
        const mockClickFn = jest.fn();
        render(
            <Button type="button" onClick={mockClickFn}>
                Test Text
            </Button>
        );
        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(mockClickFn).toHaveBeenCalled();
    });
});
