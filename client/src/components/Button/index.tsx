import React, {useCallback} from 'react';

import styles from './index.module.css';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined;
    children: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({type, children, onClick}) => {
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return (
        <button className={styles.button} type={type} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
