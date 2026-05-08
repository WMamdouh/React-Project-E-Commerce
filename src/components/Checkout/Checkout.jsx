import React, { useContext, useState } from 'react';
import style from './Checkout.module.css';

import { useFormik } from 'formik';

import {
  Form,
  Button,
  Container,
  Spinner,
  Alert
} from 'react-bootstrap';

import { CartContext } from '../../context/CartContext';

export default function Checkout() {

  const [apiError, setApiError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {
    checkOut,
    cart
  } = useContext(CartContext);

  // dynamic frontend url
  const baseUrl = window.location.origin;

  const formik = useFormik({

    initialValues: {
      details: '',
      phone: '',
      city: '',
    },

    onSubmit: handleSubmit

  });

  async function handleSubmit() {

    try {

      setIsLoading(true);

      setApiError('');

      // get cart id dynamically
      const cartId = cart?.cartId;

      const data = await checkOut(
        cartId,
        baseUrl,
        formik.values
      );

      if (data?.status === 'success') {

        window.location.href = data.session.url;

      } else {

        setApiError(
          'Failed to start checkout session'
        );

      }

    } catch (error) {

      setApiError(
        error?.response?.data?.message ||
        'Something went wrong during checkout'
      );

    } finally {

      setIsLoading(false);

    }
  }

  return (
    <section className={style.checkoutPage}>

      <Container className="py-5">

        <div className={style.checkoutCard}>

          <h2 className="text-center mb-4">
            Checkout
          </h2>

          {apiError && (
            <Alert variant="danger">
              {apiError}
            </Alert>
          )}

          <Form onSubmit={formik.handleSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>
                Address Details
              </Form.Label>

              <Form.Control
                type="text"
                name="details"
                placeholder="Enter your address"
                onChange={formik.handleChange}
                value={formik.values.details}
                className={style.input}
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>
                Phone Number
              </Form.Label>

              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter your phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className={style.input}
              />

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>
                City
              </Form.Label>

              <Form.Control
                type="text"
                name="city"
                placeholder="Enter your city"
                onChange={formik.handleChange}
                value={formik.values.city}
                className={style.input}
              />

            </Form.Group>

            <Button
              type="submit"
              className={style.checkoutBtn}
              disabled={isLoading}
            >

              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  {' '}
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}

            </Button>

          </Form>

        </div>

      </Container>

    </section>
  );
}