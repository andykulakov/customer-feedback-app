import React, {useCallback, useRef, useState} from 'react';

import {postReview} from '../../services/actions';
import {ReviewForm} from '../../types/forms';
import {FormFields} from '../../types/enums';
import {useFormValidation} from '../../hooks/useFormValidation';

import TextField from './TextField';
import RadioGroupField from './RadioGroupField';
import TextareaField from './TextareaField';
import Button from '../Button';
import ErrorMessage from './ErrorMesage';

import {initialFormData, initialErrors, validationRules} from './configuration';
import styles from './index.module.css';

interface FormProps {
    onSubmitSuccess(): void;
}

function getFormattedFieldValue(field: FormFields, value: string): string | number {
    switch (field) {
        case FormFields.Rating:
            return Number(value);
        default:
            return value;
    }
}

const Form: React.FC<FormProps> = ({onSubmitSuccess}) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [form, setForm] = useState<ReviewForm>(initialFormData);
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const {errors, validateFieldIfHasError, validateFormAndGetIsValid} = useFormValidation({form, validationRules, initialErrors});

    const tryPostReview = useCallback(() => {
        postReview(form)
            .then(() => {
                setForm(initialFormData);
                setFormErrorMessage('');
                onSubmitSuccess();
            })
            .catch(error => {
                setFormErrorMessage('Review submission failed. Please, try again.');
                console.error('Could not submit review.', error);
            });
    }, [form, onSubmitSuccess]);

    const handleSubmit: React.FormEventHandler = useCallback(
        async event => {
            event.preventDefault();
            const isFormValid = validateFormAndGetIsValid();

            if (isFormValid) {
                tryPostReview();
            } else {
                if (formRef.current) {
                    formRef.current?.scrollIntoView();
                }
            }
        },
        [validateFormAndGetIsValid, tryPostReview]
    );

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        event => {
            const name = event.target.name as FormFields;
            const value = getFormattedFieldValue(name, event.target.value);

            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
            validateFieldIfHasError(name, value);
        },
        [validateFieldIfHasError]
    );

    return (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputWrapper}>
                <TextField
                    value={form.name}
                    name={FormFields.Name}
                    type="text"
                    placeholder="Name"
                    label="Name"
                    error={errors.name}
                    isRequired
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextField
                    value={form.email}
                    name={FormFields.Email}
                    type="email"
                    placeholder="Email"
                    label="Email"
                    error={errors.email}
                    isRequired
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <RadioGroupField
                    value={form.rating}
                    name={FormFields.Rating}
                    label="Rating"
                    length={5}
                    error={errors.rating}
                    isRequired
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <TextareaField
                    value={form.comment}
                    name={FormFields.Comment}
                    placeholder="Comment (maximum 140 symbols)"
                    label="Comment (maximum 140 symbols)"
                    maxLength={140}
                    error={errors.comment}
                    isRequired
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button type="submit" aria-describedby="submit-error">
                    Submit your review
                </Button>
                <ErrorMessage id="submit-error" isHidden={!formErrorMessage}>
                    {formErrorMessage}
                </ErrorMessage>
            </div>
        </form>
    );
};

export default Form;
