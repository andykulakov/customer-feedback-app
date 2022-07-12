import React, {useState, useCallback} from 'react';

import {getDataService} from '../../services/data';
import {ReviewForm} from '../../types/reviews';

import TextField from './TextField';
import RadioGroupField from './RadioGroupField';
import TextareaField from './TextareaField';
import Button from '../Button';

import styles from './index.module.css';

interface FormProps {
    onSubmitSuccess(): void;
}

const initialFormData: ReviewForm = {
    name: '',
    email: '',
    rating: 0,
    comment: ''
};

const Form: React.FC<FormProps> = ({onSubmitSuccess}) => {
    const [form, setForm] = useState<ReviewForm>(initialFormData);

    const handleSubmit: React.FormEventHandler = useCallback(
        async event => {
            event.preventDefault();

            getDataService()
                .postReview(form)
                .then(() => {
                    setForm(initialFormData);
                    onSubmitSuccess();
                });
        },
        [form, onSubmitSuccess]
    );

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        const name = event.target.name;
        const value = name === 'rating' ? Number(event.target.value) : event.target.value;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <TextField value={form.name} name="name" type="text" placeholder="Name" label="Name" isRequired onChange={handleInputChange} />
            </div>
            <div className={styles.inputWrapper}>
                <TextField value={form.email} name="email" type="email" placeholder="Email" label="Email" isRequired onChange={handleInputChange} />
            </div>
            <div className={styles.inputWrapper}>
                <RadioGroupField value={form.rating} name="rating" label="Rating" length={5} isRequired onChange={handleInputChange} />
            </div>
            <div className={styles.inputWrapper}>
                <TextareaField
                    value={form.comment}
                    name="comment"
                    placeholder="Comment (maximum 140 symbols)"
                    label="Comment (maximum 140 symbols)"
                    maxLength={140}
                    isRequired
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputWrapper}>
                <Button type="submit">Submit your review</Button>
            </div>
        </form>
    );
};

export default Form;
