import React from 'react';

import styles from './index.module.css';

interface ErrorMessageProps {
    children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({children}) => {
    return <div className={styles.errorMessage}>{children}</div>;
};

export default ErrorMessage;
