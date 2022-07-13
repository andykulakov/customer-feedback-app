import React from 'react';

import styles from './index.module.css';

interface RatingInputProps {
    legend: string;
    isRequired: boolean;
    children: React.ReactNode;
}

const Fieldset: React.FC<RatingInputProps> = ({legend, isRequired, children}) => {
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
                {legend} {isRequired && <i aria-hidden="true">*</i>}
            </legend>
            {children}
        </fieldset>
    );
};

export default Fieldset;
