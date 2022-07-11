import React from 'react';
import {render, screen} from '@testing-library/react';

import RadioGroupField, {RadioGroupFieldProps} from '.';

function createTestables(propOverrides?: Partial<RadioGroupFieldProps>) {
    render(<RadioGroupField value={5} name="name" label="label" length={5} isRequired={false} onChange={jest.fn()} {...propOverrides} />);
}

describe('client/src/components/Form/RadioGroupField', () => {
    it('should display a certain amount of inputs based on the length prop', () => {
        createTestables({
            length: 3
        });

        expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('should display the group label', () => {
        createTestables({
            label: 'Group Label'
        });

        expect(screen.getByRole('group')).toHaveAccessibleName('Group Label');
    });

    it('should pass the name to the inputs', () => {
        createTestables({
            name: 'Test Name'
        });

        screen.getAllByRole<HTMLInputElement>('radio').map(input => {
            expect(input.name).toBe('Test Name');
        });
    });

    it('should pass the required prop to the inputs', () => {
        createTestables({
            isRequired: true
        });

        screen.getAllByRole<HTMLInputElement>('radio').map(input => {
            expect(input).toBeRequired();
        });
    });
});
