import React from 'react';

import styles from './index.module.css';

interface LabelProps {
    htmlFor: string;
    isRequired: boolean;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({htmlFor, isRequired, children}) => {
    return (
        <label className={styles.label} htmlFor={htmlFor}>
            {children} {isRequired && <i aria-hidden="true">*</i>}
        </label>
    );
};

export default Label;
