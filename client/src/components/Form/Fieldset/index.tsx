import React from 'react';

import styles from './index.module.css';

interface RatingInputProps {
    legend: string;
    isRequired: boolean;
    'aria-required': 'true' | 'false';
    'aria-invalid': 'true' | 'false';
    'aria-describedby': string;
    children: React.ReactNode;
}

const Fieldset: React.FC<RatingInputProps> = props => {
    const {legend, isRequired, children} = props;

    return (
        <fieldset
            className={styles.fieldset}
            aria-required={props['aria-required']}
            aria-invalid={props['aria-invalid']}
            aria-describedby={props['aria-describedby']}
        >
            <legend className={styles.legend}>
                {legend} {isRequired && <i aria-hidden="true">*</i>}
            </legend>
            {children}
        </fieldset>
    );
};

export default Fieldset;
