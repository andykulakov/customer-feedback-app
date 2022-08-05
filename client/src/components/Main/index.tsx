import React, {useEffect, useCallback, useContext} from 'react';

import {getReviews} from '../../services/actions';

import {AppContext} from '../AppContextProvider';
import Form from '../Form';

import styles from './index.module.css';

const Graph = React.lazy(() => import('../Graph'));
const LatestComments = React.lazy(() => import('../LatestComments'));

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
