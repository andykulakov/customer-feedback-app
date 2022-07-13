import {useCallback, useState} from 'react';

import {isString} from '../helpers/typeguards';
import {FormFields} from '../types/enums';
import {FormValidationRules, ErrorInfo, Errors, ReviewForm} from '../types/forms';

interface UseFormValidationOptions {
    form: ReviewForm;
    validationRules: FormValidationRules;
    initialErrors: Errors;
}

export function useFormValidation(options: UseFormValidationOptions) {
    const {form, validationRules, initialErrors} = options;
    const [errors, setErrors] = useState<Errors>(initialErrors);

    const validateField = useCallback(
        (formField: FormFields, value: string | number): ErrorInfo => {
            const validationRule = validationRules[formField];
            const fieldError: ErrorInfo = {
                hasErrors: false,
                message: ''
            };

            if (validationRule?.required?.value && !value) {
                fieldError.hasErrors = true;
                fieldError.message = validationRule?.required?.message;
            }

            const pattern = validationRule?.pattern;
            if (pattern?.value && isString(value) && !RegExp(pattern.value).test(value)) {
                fieldError.hasErrors = true;
                fieldError.message = pattern.message;
            }

            const custom = validationRule?.custom;
            if (custom?.isValid && !custom.isValid(value)) {
                fieldError.hasErrors = true;
                fieldError.message = custom.message;
            }

            setErrors(prevState => ({
                ...prevState,
                [formField]: fieldError
            }));

            return fieldError;
        },
        [validationRules]
    );

    const validateFieldIfHasError = useCallback(
        (formField: FormFields, value: string | number) => {
            if (errors[formField].hasErrors) {
                validateField(formField, value);
            }
        },
        [errors, validateField]
    );

    const validateFormAndGetIsValid = useCallback(() => {
        const updatedErrors: Errors = {...initialErrors};
        (Object.keys(errors) as FormFields[]).forEach(field => {
            const {hasErrors, message} = validateField(field, form[field]);
            updatedErrors[field] = {
                hasErrors,
                message
            };
        });

        setErrors(updatedErrors);

        return !Object.values(updatedErrors).some(field => field.hasErrors);
    }, [form, errors, validateField, initialErrors]);

    return {
        errors,
        validateFieldIfHasError,
        validateFormAndGetIsValid
    };
}
