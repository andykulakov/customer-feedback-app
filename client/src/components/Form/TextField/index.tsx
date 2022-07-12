import React from 'react';

import Label from '../Label';

import styles from './index.module.css';

export interface TextFieldProps {
    value: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    isRequired: boolean;
    onChange: React.ChangeEventHandler;
}

const TextField: React.FC<TextFieldProps> = ({value, name, type, placeholder, label, isRequired, onChange}) => {
    const inputId = `input-${name}`;

    return (
        <React.Fragment>
            <Label htmlFor={inputId}>{label}</Label>
            <input
                id={inputId}
                className={styles.input}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default TextField;
