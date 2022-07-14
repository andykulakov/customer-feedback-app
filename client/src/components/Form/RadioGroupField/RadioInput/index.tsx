import React from 'react';

import styles from './index.module.css';

interface RadioInputProps {
    value: number;
    name: string;
    isChecked: boolean;
    isVisuallyChecked: boolean;
    isRequired: boolean;
    children: React.ReactNode;
    onChange: React.ChangeEventHandler;
}

const RadioInput: React.FC<RadioInputProps> = ({value, name, isChecked, isVisuallyChecked, isRequired, children, onChange}) => {
    const inputId = `${name}-${value}`;

    return (
        <React.Fragment>
            <input
                id={inputId}
                className={`${styles.input} ${styles.hidden}`}
                value={value}
                checked={isChecked}
                name={name}
                type="radio"
                required={isRequired}
                onChange={onChange}
            />
            <label className={`${styles.label} ${isVisuallyChecked && styles.checked}`} htmlFor={inputId}>
                {children}
            </label>
        </React.Fragment>
    );
};

export default RadioInput;
