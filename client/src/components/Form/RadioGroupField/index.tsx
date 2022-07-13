import React from 'react';

import {getArrayFromLength} from '../../../helpers';
import {ErrorInfo} from '../../../types/forms';

import Fieldset from '../Fieldset';
import RadioInput from './RadioInput';
import Star from '../../Star';
import ErrorMessage from '../ErrorMesage';

import styles from './index.module.css';

export interface RadioGroupFieldProps {
    name: string;
    value: number;
    label: string;
    length: number;
    error: ErrorInfo;
    isRequired: boolean;
    onChange: React.ChangeEventHandler;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({name, value, label, length, error, isRequired, onChange}) => {
    const errorId = `${name}-error`;

    return (
        <Fieldset legend={label} isRequired={isRequired} aria-describedby={error.hasErrors ? errorId : undefined}>
            {getArrayFromLength(length).map(inputValue => {
                return (
                    <RadioInput
                        key={inputValue}
                        value={inputValue}
                        name={name}
                        isChecked={Number(value) === inputValue}
                        isVisuallyChecked={inputValue <= value}
                        isRequired={isRequired}
                        errorId={error.hasErrors ? errorId : null}
                        onChange={onChange}
                    >
                        <span className={styles.hidden}>{inputValue} stars</span>
                        <Star className={styles.star} />
                    </RadioInput>
                );
            })}
            {error.hasErrors && <ErrorMessage id={errorId}>{error.message}</ErrorMessage>}
        </Fieldset>
    );
};

export default RadioGroupField;
