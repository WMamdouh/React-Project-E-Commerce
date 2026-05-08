import React, { useContext, useState } from 'react';
import style from './Login.module.css';
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

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });


    async function handleLogin(values) {
        try {
            setIsLoading(true);
            setApiError('');

            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signin',
                values
            );

            setIsLoading(false);

            if (response?.data?.message === 'success') {
                navigate('/');
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
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: handleLogin,
    });

    return (
  <div className={style.loginPage}>
    <Container>
      <div className={style.loginWrapper}>
        <div className={style.loginInfo}>
          <span className={style.badge}>FreshCart</span>
          <h1>Welcome Back!</h1>
          <p>
            Login to continue shopping, manage your cart, and explore fresh products.
          </p>

          <div className={style.infoBox}>
            <i className="fas fa-shield-alt"></i>
            <span>Secure login with protected account access</span>
          </div>
        </div>

        <div className={style.loginCard}>
          <div className={style.formHeader}>
            <h2>Login</h2>
            <p>Enter your email and password to access your account</p>
          </div>

          {apiError ? (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          ) : null}

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={style.label}>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="example@email.com"
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

            <div className={style.formOptions}>
              <label className={style.rememberMe}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button" className={style.forgotBtn}>
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className={style.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  Login <i className="fas fa-arrow-right ms-2"></i>
                </>
              )}
            </Button>

            <div className={style.registerText}>
              Don&apos;t have an account?
              <button type="button" onClick={() => navigate('/register')}>
                Create account
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  </div>
);
}