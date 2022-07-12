import {FormFields} from './enums';

export interface DBReview {
    id: string;
    date: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    date: string;
    name: string;
    rating: number;
    comment: string;
}

export interface ReviewForm {
    [FormFields.Name]: string;
    [FormFields.Email]: string;
    [FormFields.Rating]: number;
    [FormFields.Comment]: string;
}

export interface ErrorInfo {
    hasErrors: boolean;
    message: string;
}

export type Errors = Record<FormFields, ErrorInfo>;
