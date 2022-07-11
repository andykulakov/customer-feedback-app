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
    name: string;
    email: string;
    rating: number;
    comment: string;
}
