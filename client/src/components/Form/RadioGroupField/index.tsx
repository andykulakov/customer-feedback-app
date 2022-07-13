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
    return (
        <Fieldset legend={label}>
            {getArrayFromLength(length).map(inputValue => {
                return (
                    <RadioInput
                        key={inputValue}
                        value={inputValue}
                        name="rating"
                        isChecked={Number(value) === inputValue}
                        isVisuallyChecked={inputValue <= value}
                        isRequired={isRequired}
                        onChange={onChange}
                    >
                        <span className={styles.hidden}>{inputValue} stars</span>
                        <Star className={styles.star} />
                    </RadioInput>
                );
            })}
            {error.hasErrors && <ErrorMessage>{error.message}</ErrorMessage>}
        </Fieldset>
    );
};

export default RadioGroupField;
