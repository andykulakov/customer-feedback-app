import React from 'react';

import {ErrorInfo} from '../../../types/reviews';

import Label from '../Label';

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

    return (
        <React.Fragment>
            <Label htmlFor={inputId}>{label}</Label>
            <input
                id={inputId}
                className={`${styles.input} ${error.hasErrors && styles.error}`}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                aria-required={isRequired ? 'true' : 'false'}
                onChange={onChange}
            />
            {error.hasErrors && <div className={styles.errorMessage}>{error.message}</div>}
        </React.Fragment>
    );
};

export default TextField;
