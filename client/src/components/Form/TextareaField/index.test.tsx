import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {getMockedErrorInfo} from '../../../helpers/testing';

import TextareaField, {TextareaFieldProps} from '.';

function createTestables(propOverrides?: Partial<TextareaFieldProps>) {
    render(
        <TextareaField
            value="value"
            name="name"
            label="label"
            maxLength={140}
            isRequired={false}
            placeholder="placeholder"
            error={getMockedErrorInfo()}
            onChange={jest.fn()}
            {...propOverrides}
        />
    );
}

describe('client/src/components/Form/TextareaField', () => {
    it('should display the label', () => {
        createTestables({
            label: 'Test Textarea Label'
        });

        expect(screen.getByRole('textbox')).toHaveAccessibleName('Test Textarea Label');
    });

    it('should display the value', () => {
        createTestables({
            value: 'Test Textarea Value'
        });

        expect(screen.getByRole('textbox')).toHaveDisplayValue('Test Textarea Value');
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
            name: 'Test Textarea Name'
        });

        expect(screen.getByRole<HTMLTextAreaElement>('textbox').name).toBe('Test Textarea Name');
    });

    it('should have a correct required attribute', () => {
        createTestables({
            isRequired: true
        });

        expect(screen.getByRole('textbox')).toBeRequired();
    });
});
