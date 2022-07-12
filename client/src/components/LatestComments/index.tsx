import React, {useContext} from 'react';

import {AppContext} from '../AppContextProvider';

import ReviewCard from './ReviewCard';

import styles from './index.module.css';

const LatestComments: React.FC = () => {
    const {data} = useContext(AppContext);

    return (
        <section>
            <h2 className={styles.heading}>Latest Comments</h2>
            <div className={styles.reviews}>
                {data.reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};

export default LatestComments;
