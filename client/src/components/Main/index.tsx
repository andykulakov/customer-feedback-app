import React, {useEffect, useCallback, useContext} from 'react';

import {getReviews} from '../../services/actions';

import {AppContext} from '../AppContextProvider';
import Form from '../Form';
import Graph from '../Graph';
import LatestComments from '../LatestComments';

import styles from './index.module.css';

const Main: React.FC = () => {
    const {setData} = useContext(AppContext);

    const getReviewsAndUpdateState = useCallback(() => {
        getReviews().then(reviews => {
            if (reviews) {
                setData({reviews});
            }
        });
    }, [setData]);

    useEffect(() => {
        getReviewsAndUpdateState();
    }, [getReviewsAndUpdateState]);

    return (
        <main className={styles.main}>
            <Form onSubmitSuccess={getReviewsAndUpdateState} />
            <Graph />
            <div className={styles.columnWide}>
                <LatestComments />
            </div>
        </main>
    );
};

export default Main;
