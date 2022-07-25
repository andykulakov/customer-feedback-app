import axios from 'axios';

import {ReviewForm} from '../types/forms';

const API_URL = 'http://localhost:9000';
export const API_REVIEWS_URL = `${API_URL}/reviews`;
let dataServiceInstance: DataService;

export class DataService {
    private get(url: string): Promise<unknown> {
        return axios.get(url);
    }

    private post<T>(url: string, body: T): Promise<void> {
        return axios.post(url, body);
    }

    public getReviews(): Promise<unknown> {
        return this.get(API_REVIEWS_URL);
    }

    public postReview(body: ReviewForm): Promise<void> {
        return this.post(API_REVIEWS_URL, body);
    }
}

export function getDataService() {
    if (dataServiceInstance) {
        return dataServiceInstance;
    }

    dataServiceInstance = new DataService();
    return dataServiceInstance;
}
