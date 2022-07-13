import axios from 'axios';

import {ReviewForm} from '../types/forms';

export const API_URL = 'http://localhost:9000';
let dataServiceInstance: DataService;

export class DataService {
    private get(url: string): Promise<unknown> {
        return axios.get(url);
    }

    private post<T>(url: string, body: T): Promise<unknown> {
        return axios.post(url, body);
    }

    public getReviews(): Promise<unknown> {
        return this.get(`${API_URL}/reviews`);
    }

    public postReview(body: ReviewForm): Promise<unknown> {
        return this.post(`${API_URL}/reviews/new`, body);
    }
}

export function getDataService() {
    if (dataServiceInstance) {
        return dataServiceInstance;
    }

    return new DataService();
}
