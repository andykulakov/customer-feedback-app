import React from 'react';

import styles from './index.module.css';

interface RatingInputProps {
    legend: string;
    children: React.ReactNode;
}

const Fieldset: React.FC<RatingInputProps> = ({legend, children}) => {
    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{legend}</legend>
            {children}
        </fieldset>
    );
};

export default Fieldset;
