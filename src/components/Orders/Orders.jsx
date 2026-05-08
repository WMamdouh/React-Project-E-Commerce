import React, { useEffect, useState } from 'react';
import style from './Orders.module.css';

import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';

import {
    Link
} from 'react-router-dom';

export default function Orders() {

    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {

        // fake order number
        const randomOrder =
            'ORD-' +
            Math.floor(Math.random() * 1000000);

        setOrderNumber(randomOrder);

    }, []);

    return (
        <section className={style.ordersPage}>

            {/* BACKGROUND SHAPES */}
            <div className={style.circleOne}></div>
            <div className={style.circleTwo}></div>

            <Container>

                <Row className="justify-content-center">

                    <Col lg={8}>

                        <Card className={style.successCard}>

                            {/* SUCCESS ICON */}
                            <div className={style.iconBox}>

                                <div className={style.checkmark}>
                                    <i className="fas fa-check"></i>
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className={style.content}>

                                <span className={style.badgeText}>
                                    Payment Successful
                                </span>

                                <h1>
                                    Thank You For Your Order 🎉
                                </h1>

                                <p className={style.description}>
                                    Your payment has been processed
                                    successfully and your order is now
                                    being prepared for shipping.
                                </p>

                                {/* ORDER INFO */}
                                <div className={style.infoGrid}>

                                    <div className={style.infoCard}>

                                        <i className="fas fa-receipt"></i>

                                        <h5>Order Number</h5>

                                        <span>{orderNumber}</span>

                                    </div>

                                    <div className={style.infoCard}>

                                        <i className="fas fa-truck"></i>

                                        <h5>Delivery</h5>

                                        <span>2 - 5 Business Days</span>

                                    </div>

                                    <div className={style.infoCard}>

                                        <i className="fas fa-envelope"></i>

                                        <h5>Email Confirmation</h5>

                                        <span>Sent Successfully</span>

                                    </div>

                                </div>

                                {/* TIMELINE */}
                                <div className={style.timeline}>

                                    <div className={style.timelineItem}>

                                        <div className={style.timelineIcon}>
                                            <i className="fas fa-check"></i>
                                        </div>

                                        <div>
                                            <h6>Payment Confirmed</h6>
                                            <p>Your transaction was approved.</p>
                                        </div>

                                    </div>

                                    <div className={style.timelineItem}>

                                        <div className={style.timelineIcon}>
                                            <i className="fas fa-box"></i>
                                        </div>

                                        <div>
                                            <h6>Preparing Order</h6>
                                            <p>Your items are being packed.</p>
                                        </div>

                                    </div>

                                    <div className={style.timelineItem}>

                                        <div className={style.timelineIcon}>
                                            <i className="fas fa-shipping-fast"></i>
                                        </div>

                                        <div>
                                            <h6>Shipping Soon</h6>
                                            <p>
                                                You will receive tracking details
                                                shortly.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* BUTTONS */}
                                <div className={style.actions}>

                                    <Link to="/products">

                                        <Button className={style.shopBtn}>

                                            <i className="fas fa-shopping-bag"></i>

                                            Continue Shopping

                                        </Button>

                                    </Link>

                                    <Link to="/cart">

                                        <Button
                                            variant="light"
                                            className={style.cartBtn}
                                        >

                                            <i className="fas fa-shopping-cart"></i>

                                            Back To Cart

                                        </Button>

                                    </Link>

                                </div>

                            </div>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </section>
    );
}