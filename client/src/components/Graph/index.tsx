import React, {useContext, useMemo} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import {Review} from '../../types/reviews';

import {AppContext} from '../AppContextProvider';

import styles from './index.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ReviewCountByRating = Record<string, number>;

const options = {
    responsive: true,
    scales: {
        yAxis: {
            ticks: {
                precision: 0
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: false,
            text: 'Product Rating'
        }
    }
};

function getReviewCountByRating(reviews: Review[]): ReviewCountByRating {
    return reviews.reduce<ReviewCountByRating>(
        (obj, review) => {
            const ratingKey = review.rating;

            if (obj[ratingKey]) {
                obj[ratingKey]++;
            } else {
                obj[ratingKey] = 1;
            }

            return obj;
        },
        {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }
    );
}

const Graph: React.FC = () => {
    const {data} = useContext(AppContext);
    const averageRating: string = useMemo(() => {
        if (data.reviews.length === 0) {
            return '';
        }

        return (data.reviews.reduce((productRating, review) => productRating + review.rating, 0) / data.reviews.length).toFixed(1);
    }, [data.reviews]);
    const reviewCountByRating = useMemo(() => getReviewCountByRating(data.reviews), [data.reviews]);
    const graphData = useMemo(
        () => ({
            labels: Object.keys(reviewCountByRating).map(rating => `${rating} stars`),
            datasets: [
                {
                    label: 'Number of reviews',
                    backgroundColor: '#0c1142',
                    borderColor: '#0c1142',
                    tension: 0.3,
                    data: Object.values(reviewCountByRating)
                }
            ]
        }),
        [reviewCountByRating]
    );

    return (
        <section>
            <h2 className={styles.heading}>Product Rating {averageRating && <span>({averageRating} stars)</span>}</h2>
            <Bar data={graphData} options={options} />
        </section>
    );
};

export default Graph;
