import React from 'react';

interface StarProps {
    className: string;
}

const Star: React.FC<StarProps> = ({className}) => {
    return (
        <svg className={className} fill="currentColor" stroke="currentColor" viewBox="0 0 512 512">
            <path d="M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z"></path>
        </svg>
    );
};

export default Star;
