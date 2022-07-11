import React from 'react';

import styles from './index.module.css';

interface LabelProps {
    htmlFor: string;
    children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({htmlFor, children}) => {
    return (
        <label className={styles.label} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default Label;
