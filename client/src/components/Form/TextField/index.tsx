import React from 'react';

import {ErrorInfo} from '../../../types/forms';

import Label from '../Label';
import ErrorMessage from '../ErrorMesage';

import styles from './index.module.css';

export interface TextFieldProps {
    value: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    error: ErrorInfo;
    isRequired: boolean;
    onChange: React.ChangeEventHandler;
}

const TextField: React.FC<TextFieldProps> = ({value, name, type, placeholder, label, error, isRequired, onChange}) => {
    const inputId = `input-${name}`;
    const errorId = `${name}-error`;

    return (
        <React.Fragment>
            <Label htmlFor={inputId} isRequired={isRequired}>
                {label}
            </Label>
            <input
                id={inputId}
                className={`${styles.input} ${error.hasErrors && styles.error}`}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                aria-required={isRequired ? 'true' : 'false'}
                aria-invalid={error.hasErrors ? 'true' : 'false'}
                aria-describedby={error.hasErrors ? errorId : undefined}
                onChange={onChange}
            />
            <ErrorMessage id={errorId} isHidden={!error.hasErrors}>
                {error.message}
            </ErrorMessage>
        </React.Fragment>
    );
};

export default TextField;
