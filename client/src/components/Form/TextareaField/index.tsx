import React from 'react';

import {ErrorInfo} from '../../../types/forms';

import Label from '../Label';
import ErrorMessage from '../ErrorMesage';

import styles from './index.module.css';

export interface TextareaFieldProps {
    value: string;
    name: string;
    placeholder: string;
    label: string;
    maxLength: number;
    error: ErrorInfo;
    isRequired: boolean;
    onChange: React.ChangeEventHandler;
}

const TextareaField: React.FC<TextareaFieldProps> = ({value, name, placeholder, label, maxLength, error, isRequired, onChange}) => {
    const inputId = `input-${name}`;

    return (
        <React.Fragment>
            <Label htmlFor={inputId}>{label}</Label>
            <textarea
                id={inputId}
                className={`${styles.textarea} ${error.hasErrors && styles.error}`}
                value={value}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                required={isRequired}
                onChange={onChange}
            />
            {error.hasErrors && <ErrorMessage>{error.message}</ErrorMessage>}
        </React.Fragment>
    );
};

export default TextareaField;
