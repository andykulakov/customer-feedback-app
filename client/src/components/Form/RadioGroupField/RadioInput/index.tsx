import React from 'react';

import styles from './index.module.css';

interface RadioInputProps {
    value: number;
    name: string;
    isChecked: boolean;
    isVisuallyChecked: boolean;
    isRequired: boolean;
    errorId: string | null;
    children: React.ReactNode;
    onChange: React.ChangeEventHandler;
}

const RadioInput: React.FC<RadioInputProps> = ({value, name, isChecked, isVisuallyChecked, isRequired, errorId, children, onChange}) => {
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
                aria-required={isRequired ? 'true' : 'false'}
                aria-describedby={errorId ? errorId : undefined}
                onChange={onChange}
            />
            <label className={`${styles.label} ${isVisuallyChecked && styles.checked}`} htmlFor={inputId}>
                {children}
            </label>
        </React.Fragment>
    );
};

export default RadioInput;
