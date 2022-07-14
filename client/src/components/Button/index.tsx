import React, {useCallback} from 'react';

import styles from './index.module.css';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined;
    'aria-describedby'?: string;
    children: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = props => {
    const {type, children, onClick} = props;

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return (
        <button className={styles.button} type={type} aria-describedby={props['aria-describedby']} onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
