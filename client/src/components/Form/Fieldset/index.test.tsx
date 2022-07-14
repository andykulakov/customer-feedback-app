import React from 'react';
import {render, screen} from '@testing-library/react';

import Fieldset from '.';

describe('client/src/components/Form/Fieldset', () => {
    function createTestables() {
        render(
            <Fieldset aria-required="true" aria-invalid="false" aria-describedby="id" legend="Legend" isRequired>
                <input type="text" />
            </Fieldset>
        );
    }

    it('should display a legend', () => {
        createTestables();

        expect(screen.getByRole('group')).toHaveAccessibleName('Legend');
    });

    it('should display children', () => {
        createTestables();

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
});
