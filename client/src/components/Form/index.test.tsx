import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import * as actionsModule from '../../services/actions';

import Form from '.';

describe('client/src/components/Form', () => {
    // scrollIntoView is not implemented in jsdom by default
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    describe('should update text inputs', () => {
        render(<Form onSubmitSuccess={jest.fn()} />);

        const textInputs = screen.getAllByRole('textbox');
        textInputs.forEach(input => {
            it(`should update "${input.getAttribute('name')}" input`, () => {
                fireEvent.change(input, {target: {value: 'Hello World'}});

                expect(input).toHaveValue('Hello World');
            });
        });
    });

    describe('should update radio inputs', () => {
        render(<Form onSubmitSuccess={jest.fn()} />);

        screen.getAllByRole('radio').forEach(input => {
            it(`should update "${input.getAttribute('value')}" input`, () => {
                expect(input).not.toBeChecked();

                fireEvent.click(input);

                expect(input).toBeChecked();
            });
        });
    });

    describe('should validate fields', () => {
        function expectErrorsForEmptyFields() {
            expect(screen.getByText('Name is required.')).toBeInTheDocument();
            expect(screen.getByText('Email is required.')).toBeInTheDocument();
            expect(screen.getByText('Rating is required. Please, choose an option.')).toBeInTheDocument();
            expect(screen.getByText('Comment is required.')).toBeInTheDocument();
        }

        it("should display 'is required' error if fields are empty", () => {
            render(<Form onSubmitSuccess={jest.fn()} />);

            fireEvent.click(screen.getByText('Submit your review'));

            expectErrorsForEmptyFields();
        });

        it("should display 'is invalid' error if the email value does not match the email pattern", () => {
            render(<Form onSubmitSuccess={jest.fn()} />);

            fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: 'test'}});
            fireEvent.click(screen.getByText('Submit your review'));

            expect(screen.getByText('Email is invalid.')).toBeInTheDocument();

            fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: 'test@'}});
            fireEvent.click(screen.getByText('Submit your review'));

            expect(screen.getByText('Email is invalid.')).toBeInTheDocument();
        });

        it('should revalidate fields on input change', () => {
            render(<Form onSubmitSuccess={jest.fn()} />);

            fireEvent.click(screen.getByText('Submit your review'));

            expectErrorsForEmptyFields();

            const textInputs = screen.getAllByRole('textbox');
            textInputs.forEach(input => {
                fireEvent.change(input, {target: {value: 'test@test.com'}});
            });
            fireEvent.click(screen.getAllByRole('radio')[0]);

            expect(screen.queryByText('Name is required.')).not.toBeInTheDocument();
            expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
            expect(screen.queryByText('Rating is required. Please, choose an option.')).not.toBeInTheDocument();
            expect(screen.queryByText('Comment is required.')).not.toBeInTheDocument();
        });
    });

    describe('should handle review submissions', () => {
        it('should not submit form and display an error if it has invalid fields', () => {
            const postReviewsMock = jest.spyOn(actionsModule, 'postReview');
            const mockedOnSubmitSuccess = jest.fn();
            render(<Form onSubmitSuccess={mockedOnSubmitSuccess} />);

            fireEvent.click(screen.getByText('Submit your review'));

            expect(postReviewsMock).not.toHaveBeenCalled();
            expect(mockedOnSubmitSuccess).not.toHaveBeenCalled();
        });

        it('should display the error message if the review submission request failed', async () => {
            const postReviewsMock = jest.spyOn(actionsModule, 'postReview').mockImplementation(() => {
                return Promise.reject('Error');
            });
            const mockedOnSubmitSuccess = jest.fn();
            render(<Form onSubmitSuccess={mockedOnSubmitSuccess} />);

            const textInputs = screen.getAllByRole('textbox');
            textInputs.forEach(input => {
                fireEvent.change(input, {target: {value: 'test@test.com'}});
            });
            fireEvent.click(screen.getAllByRole('radio')[0]);

            fireEvent.click(screen.getByText('Submit your review'));

            expect(postReviewsMock).toHaveBeenCalled();
            expect(mockedOnSubmitSuccess).not.toHaveBeenCalled();
            expect(await screen.findByText('Review submission failed. Please, try again.')).toBeInTheDocument();
        });
    });
});
