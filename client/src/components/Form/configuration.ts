import {FormValidationRules, Errors, ReviewForm} from '../../types/forms';
import {isNumber} from '../../helpers/typeguards';

const EMAIL_REGEXP =
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

export const initialFormData: ReviewForm = {
    name: '',
    email: '',
    rating: 0,
    comment: ''
};

export const initialErrors: Errors = {
    name: {
        hasErrors: false,
        message: ''
    },
    email: {
        hasErrors: false,
        message: ''
    },
    rating: {
        hasErrors: false,
        message: ''
    },
    comment: {
        hasErrors: false,
        message: ''
    }
};

export const validationRules: FormValidationRules = {
    name: {
        required: {
            value: true,
            message: 'Name is required.'
        }
    },
    email: {
        required: {
            value: true,
            message: 'Email address is required.'
        },
        pattern: {
            value: EMAIL_REGEXP,
            message: 'Email address is invalid.'
        }
    },
    rating: {
        custom: {
            isValid: value => isNumber(value) && Number(value) > 0,
            message: 'Rating is required. Please, choose an option.'
        }
    },
    comment: {
        required: {
            value: true,
            message: 'Comment is required.'
        }
    }
};
