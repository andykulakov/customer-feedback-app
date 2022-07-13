import {FormFields} from './enums';

export type FormValidationRules = Record<FormFields, ValidationRules>;

export interface ValidationRules {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid(value: string | number): boolean;
        message: string;
    };
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
