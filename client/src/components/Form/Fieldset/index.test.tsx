import React from 'react';
import {render, screen} from '@testing-library/react';

import Fieldset from '.';

describe('client/src/components/Form/Fieldset', () => {
    it('should display a legend', () => {
        render(
            <Fieldset legend="Legend">
                <input type="text" />
            </Fieldset>
        );

        expect(screen.getByRole('group')).toHaveAccessibleName('Legend');
    });

    it('should display children', () => {
        render(
            <Fieldset legend="Legend">
                <input type="text" />
            </Fieldset>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});
