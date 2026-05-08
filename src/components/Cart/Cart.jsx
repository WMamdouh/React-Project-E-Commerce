import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../../context/CartContext';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

    const {
        getCartItems,
        removeCartItem,
        updateCartItem,
        setCart
    } = useContext(CartContext);

    const [cartDetails, setCartDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);

    async function loadCart() {
        try {
            setLoading(true);

            const res = await getCartItems();

            if (res?.status === "success") {
                setCartDetails(res.data);
            }

        } catch (err) {
            console.log(err);
            toast.error("Failed to load cart");
        } finally {
            setLoading(false);
        }
    }

    async function handleRemove(id) {
        try {
            setActionId(id);

            const res = await removeCartItem(id);

            if (res?.status === "success") {
                setCartDetails(res.data);
                toast.success("Item removed");
                setCart(res);
            }

        } catch (err) {
            console.log(err);
            toast.error("Remove failed");
        } finally {
            setActionId(null);
        }
    }

    async function handleUpdate(id, count) {
        try {
            setActionId(id);

            if (count < 1) {
                await handleRemove(id);
                return;
            }

            const res = await updateCartItem(id, count);

            if (res?.status === "success") {
                setCartDetails(res.data);
            }

        } catch (err) {
            console.log(err);
            toast.error("Update failed");
        } finally {
            setActionId(null);
        }
    }

    useEffect(() => {
        loadCart();
    }, []);

    if (loading) {
        return (
            <div className={style.loadingBox}>
                <Spinner animation="border" variant="success" />
                <p>Loading cart...</p>
            </div>
        );
    }

    if (!cartDetails?.products?.length) {
        return (
            <div className={style.emptyCart}>
                <h2>Your cart is empty 🛒</h2>
                <p>Add products to start shopping</p>
            </div>
        );
    }

    return (
        <section className={style.cartSection}>
            <Container>

                <div className={style.header}>
                    <h2>Your Cart</h2>
                    <span>{cartDetails.products.length} items</span>
                </div>

                <Row>

                    <Col lg={8}>
                        {cartDetails.products.map((item) => (
                            <Card key={item._id} className={style.cartItem}>
                                <Row className="align-items-center">

                                    <Col md={3}>
                                        <img
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            className={style.productImage}
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <h5>{item.product.title}</h5>
                                        <p>{item.product.brand?.name}</p>
                                        <p>{item.price} EGP</p>
                                    </Col>

                                    <Col md={3} className="text-center">

                                        <div className={style.qtyBox}>

                                            <Button
                                                variant="light"
                                                disabled={actionId === item.product.id}
                                                onClick={() =>
                                                    handleUpdate(item.product.id, item.count - 1)
                                                }
                                            >
                                                -
                                            </Button>

                                            <span>
                                                {actionId === item.product.id ? (
                                                    <Spinner size="sm" />
                                                ) : (
                                                    item.count
                                                )}
                                            </span>

                                            <Button
                                                variant="light"
                                                disabled={actionId === item.product.id}
                                                onClick={() =>
                                                    handleUpdate(item.product.id, item.count + 1)
                                                }
                                            >
                                                +
                                            </Button>

                                        </div>

                                        <Button
                                            className={style.removeBtn}
                                            disabled={actionId === item.product.id}
                                            onClick={() => handleRemove(item.product.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>

                                    </Col>

                                </Row>
                            </Card>
                        ))}
                    </Col>

                    <Col lg={4}>
                        <Card className={style.summaryCard}>
                            <h4>Order Summary</h4>

                            <div>
                                <span>Total Items </span>
                                <span>{cartDetails.products.length}</span>
                            </div>

                            <div>
                                <span>Total Price </span>
                                <span>{cartDetails.totalCartPrice} EGP</span>
                            </div>

                            <Link to="/checkout">
                                <Button className={style.checkoutBtn}>
                                    Checkout
                                </Button>
                            </Link>
                        </Card>
                    </Col>

                </Row>

            </Container>
        </section>
    );
}