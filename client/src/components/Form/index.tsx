import React, {useCallback, useState} from 'react';

import {getDataService} from '../../services/data';
import {ReviewForm} from '../../types/forms';
import {FormFields} from '../../types/enums';
import {useFormValidation} from '../../hooks/useFormValidation';

import TextField from './TextField';
import RadioGroupField from './RadioGroupField';
import TextareaField from './TextareaField';
import Button from '../Button';

import {initialFormData, initialErrors, validationRules} from './configuration';
import styles from './index.module.css';

interface FormProps {
    onSubmitSuccess(): void;
}

const Form: React.FC<FormProps> = ({onSubmitSuccess}) => {
    const [form, setForm] = useState<ReviewForm>(initialFormData);
    const {errors, setErrors, validateField, validateFormAndGetIsValid} = useFormValidation({form, validationRules, initialErrors});

    const handleSubmit: React.FormEventHandler = useCallback(
        async event => {
            event.preventDefault();
            const isFormValid = validateFormAndGetIsValid();

            if (isFormValid) {
                getDataService()
                    .postReview(form)
                    .then(() => {
                        setForm(initialFormData);
                        onSubmitSuccess();
                    });
            }
        },
        [form, validateFormAndGetIsValid, onSubmitSuccess]
    );

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        event => {
            const name = event.target.name as FormFields;
            const value = name === FormFields.Rating ? Number(event.target.value) : event.target.value;

            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));

            const {hasErrors, message} = validateField(name, value);
            setErrors(prevState => ({
                ...prevState,
                [name]: {
                    hasErrors,
                    message
                }
            }));
        },
        [setErrors, validateField]
    );

    return (
        <form onSubmit={handleSubmit} noValidate>
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
                <Button type="submit">Submit your review</Button>
            </div>
        </form>
    );
};

export default Form;
