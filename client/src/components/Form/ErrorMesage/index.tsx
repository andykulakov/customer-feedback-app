import React from 'react';

import styles from './index.module.css';

interface ErrorMessageProps {
    id: string;
    isHidden: boolean;
    children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({id, isHidden, children}) => {
    return (
        <div id={id} role="alert" aria-live="assertive" style={isHidden ? {display: 'none'} : undefined} className={styles.errorMessage}>
            {children}
        </div>
    );
};

export default ErrorMessage;
