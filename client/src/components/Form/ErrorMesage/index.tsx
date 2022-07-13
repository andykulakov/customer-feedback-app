import React from 'react';

import styles from './index.module.css';

interface ErrorMessageProps {
    id: string;
    children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({id, children}) => {
    return (
        <div id={id} className={styles.errorMessage}>
            {children}
        </div>
    );
};

export default ErrorMessage;
