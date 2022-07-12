import {Review} from './reviews';

export interface DBResponse<T> {
    data: T;
}

export interface AppData {
    reviews: Review[];
}

export interface AppDataHandler {
    (data: Partial<AppData>): void;
}

export interface AppContextData {
    data: AppData;
    setData: AppDataHandler;
}
