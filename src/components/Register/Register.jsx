import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';

export default function Register() {
    const navigate = useNavigate();
    let [apiError, setApiError] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let {setUserLogin} = useContext(UserContext);

    const registerValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(10, 'Name must be at most 10 characters')
            .required('Name is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        phone: Yup.string()
            .matches(
                /^01[0125][0-9]{8}$/,
                'Invalid phone number format. The phone number must be 11 digits and start with 01'
            )
            .required('Phone is required'),

        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),

        rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must be the same')
            .required('Re-enter Password is required'),
    });

    async function handleRegister(values) {
        try {
            setIsLoading(true);
            setApiError('');

            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signup',
                values
            );

            setIsLoading(false);

            if (response?.data?.message === 'success') {
                navigate('/login');
                localStorage.setItem('userToken', response.data.token);
                setUserLogin(response.data.token);
            }
        } catch (error) {
            setIsLoading(false);
            setApiError(error.response?.data?.message || 'Something went wrong');
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: handleRegister,
    });

    return (
        <div className={style.registerPage}>
            <Container>
                <div className={style.formCard}>
                    <div className={style.formHeader}>
                        <h2>Create Account</h2>
                        <p>Register now to start shopping with FreshCart</p>
                    </div>

                    {apiError ? <div className="alert alert-danger" role="alert">
                        {apiError}
                    </div> : null}


                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className={style.label}>Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.touched.name && formik.errors.name)}
                                className={style.input}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className={style.errorMessage}>{formik.errors.name}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={style.label}>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.touched.email && formik.errors.email)}
                                className={style.input}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className={style.errorMessage}>{formik.errors.email}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={style.label}>Phone</Form.Label>
                            <Form.Control
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.touched.phone && formik.errors.phone)}
                                className={style.input}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className={style.errorMessage}>{formik.errors.phone}</div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={style.label}>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(
                                    formik.touched.password && formik.errors.password
                                )}
                                className={style.input}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className={style.errorMessage}>
                                    {formik.errors.password}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className={style.label}>
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                name="rePassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(
                                    formik.touched.rePassword && formik.errors.rePassword
                                )}
                                className={style.input}
                            />
                            {formik.touched.rePassword && formik.errors.rePassword && (
                                <div className={style.errorMessage}>
                                    {formik.errors.rePassword}
                                </div>
                            )}
                        </Form.Group>

                        <div className={style.buttons}>
                            <Button type="submit" className={style.registerBtn} disabled={isLoading}>
                                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
                            </Button>

                            <Button
                                type="button"
                                className={style.cancelBtn}
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
}