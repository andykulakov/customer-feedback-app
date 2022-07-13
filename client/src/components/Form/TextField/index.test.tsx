import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {getMockedErrorInfo} from '../../../helpers/testing';

import TextField, {TextFieldProps} from '.';

function createTestables(propOverrides?: Partial<TextFieldProps>) {
    render(
        <TextField
            value="value"
            type="text"
            name="name"
            label="label"
            error={getMockedErrorInfo()}
            isRequired={false}
            placeholder="placeholder"
            onChange={jest.fn()}
            {...propOverrides}
        />
    );
}

describe('client/src/components/Form/TextareaField', () => {
    it('should display the label', () => {
        createTestables({
            label: 'Test Input Label'
        });

        expect(screen.getByRole('textbox')).toHaveAccessibleName('Test Input Label');
    });

    it('should display the value', () => {
        createTestables({
            value: 'Test Input Value'
        });

        expect(screen.getByRole('textbox')).toHaveDisplayValue('Test Input Value');
    });

    it('should call onChange on input', () => {
        const mockChangeFn = jest.fn();
        createTestables({
            onChange: mockChangeFn
        });

        fireEvent.change(screen.getByRole('textbox'), {target: {value: 'Hello World'}});

        expect(mockChangeFn).toHaveBeenCalled();
    });

    it('should have a correct name attribute', () => {
        createTestables({
            name: 'Test Input Name'
        });

        expect(screen.getByRole<HTMLInputElement>('textbox').name).toBe('Test Input Name');
    });

    it('should have a correct required attribute', () => {
        createTestables({
            isRequired: true
        });

        expect(screen.getByRole('textbox')).toBeRequired();
    });
});
