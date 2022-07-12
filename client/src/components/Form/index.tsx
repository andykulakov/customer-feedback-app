import React, {useCallback, useState} from 'react';

import {getDataService} from '../../services/data';
import {ErrorInfo, Errors, ReviewForm} from '../../types/reviews';

import TextField from './TextField';
import RadioGroupField from './RadioGroupField';
import TextareaField from './TextareaField';
import Button from '../Button';

import styles from './index.module.css';
import {FormFields} from '../../types/enums';
import {isNumber, isString} from '../../helpers/typeguards';

interface FormProps {
    onSubmitSuccess(): void;
}

const initialFormData: ReviewForm = {
    name: '',
    email: '',
    rating: 0,
    comment: ''
};
const initialErrors: Errors = {
    name: {
        hasErrors: false,
        message: ''
    },
    email: {
        hasErrors: false,
        message: ''
    },
    rating: {
        hasErrors: false,
        message: ''
    },
    comment: {
        hasErrors: false,
        message: ''
    }
};

type FormValidationRules = Record<FormFields, ValidationRules>;
interface ValidationRules {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid<T>(value: T): boolean;
        message: string;
    };
}

const validationRules: FormValidationRules = {
    [FormFields.Name]: {
        required: {
            value: true,
            message: 'Name is required'
        }
    },
    [FormFields.Email]: {
        required: {
            value: true,
            message: 'Email address is required'
        },
        pattern: {
            value: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            message: 'Email address is invalid'
        }
    },
    [FormFields.Rating]: {
        custom: {
            isValid: value => isNumber(value) && Number(value) > 0,
            message: 'Rating is required. Please, choose an option.'
        }
    },
    [FormFields.Comment]: {
        required: {
            value: true,
            message: 'Comment is required.'
        }
    }
};

const Form: React.FC<FormProps> = ({onSubmitSuccess}) => {
    const [form, setForm] = useState<ReviewForm>(initialFormData);
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const [isFormValid, setIsFormValid] = useState(true);

    const validateField = useCallback(
        (formKey: FormFields, value: string | number): ErrorInfo => {
            const validationRule = validationRules[formKey];

            if (validationRule?.required?.value && !value) {
                return {
                    hasErrors: true,
                    message: validationRule?.required?.message
                };
            }

            const pattern = validationRule?.pattern;
            if (pattern?.value && isString(value) && !RegExp(pattern.value).test(value)) {
                return {
                    hasErrors: true,
                    message: pattern.message
                };
            }

            const custom = validationRule?.custom;
            if (custom?.isValid && !custom.isValid(value)) {
                return {
                    hasErrors: true,
                    message: custom.message
                };
            }

            return {
                hasErrors: false,
                message: ''
            };
        },
        [form]
    );

    const validateForm = useCallback(() => {
        const updatedErrors: Errors = {...initialErrors};
        (Object.keys(errors) as FormFields[]).forEach(field => {
            const {hasErrors, message} = validateField(field, form[field]);
            updatedErrors[field] = {
                hasErrors,
                message
            };
        });

        setErrors(updatedErrors);
        setIsFormValid(!Object.values(updatedErrors).some(field => field.hasErrors));
    }, [form, errors, validateField]);

    const handleSubmit: React.FormEventHandler = useCallback(
        async event => {
            event.preventDefault();

            validateForm();

            getDataService()
                .postReview(form)
                .then(() => {
                    setForm(initialFormData);
                    onSubmitSuccess();
                });
        },
        [form, validateForm, onSubmitSuccess]
    );

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        event => {
            const name = event.target.name as FormFields;
            const value = event.target.value;

            setForm(prevForm => ({
                ...prevForm,
                [name]: name === FormFields.Rating ? Number(value) : value
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
        [validateField]
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
                <RadioGroupField value={form.rating} name={FormFields.Rating} label="Rating" length={5} isRequired onChange={handleInputChange} />
            </div>
            <div className={styles.inputWrapper}>
                <TextareaField
                    value={form.comment}
                    name={FormFields.Comment}
                    placeholder="Comment (maximum 140 symbols)"
                    label="Comment (maximum 140 symbols)"
                    maxLength={140}
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
