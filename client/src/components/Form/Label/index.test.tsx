import React from 'react';
import {render, screen} from '@testing-library/react';

import Label from '.';

describe('client/src/components/Form/Label', () => {
    it('should display children', () => {
        render(
            <Label htmlFor="id" isRequired>
                Test Text
            </Label>
        );

        expect(screen.getByText('Test Text')).toBeInTheDocument();
    });
});
