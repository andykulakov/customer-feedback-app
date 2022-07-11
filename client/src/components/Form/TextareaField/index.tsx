import React from 'react';

import styles from './index.module.css';
import Label from '../Label';

export interface TextareaFieldProps {
    value: string;
    name: string;
    placeholder: string;
    label: string;
    maxLength: number;
    isRequired: boolean;
    onChange: React.ChangeEventHandler;
}

const TextareaField: React.FC<TextareaFieldProps> = ({value, name, placeholder, label, maxLength, isRequired, onChange}) => {
    const inputId = `input-${name}`;

    return (
        <React.Fragment>
            <Label htmlFor={inputId}>{label}</Label>
            <textarea
                id={inputId}
                className={styles.textarea}
                value={value}
                name={name}
                placeholder={placeholder}
                maxLength={maxLength}
                required={isRequired}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default TextareaField;
