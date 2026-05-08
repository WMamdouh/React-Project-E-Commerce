import React, { useContext } from 'react';
import style from './RecentProducts.module.css';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {

    const { data, isLoading, isError, error, isFetching } = useProduct();
    const recentProducts = data?.data?.data || [];

    const { addToCart,setCart} = useContext(CartContext);

    async function handleAddToCart(productId) {
        try {
            const response = await addToCart(productId);

            if (response?.status === 'success') {
                toast.success('Product added to cart successfully!');
                setCart(response);
            } else {
                toast.error('Failed to add product to cart. Please try again.');
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message || 'Network error. Please try again.'
            );
        }
    }

    if (isError) {
        return (
            <section className={style.productsSection}>
                <Container>
                    <div className="alert alert-danger">
                        {error?.response?.data?.message ||
                            'Something went wrong while loading products.'}
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className={style.productsSection}>
            <Container>

                <div className={style.sectionHeader}>
                    <span>FreshCart Products</span>
                    <h2>Recent Products</h2>
                    <p>Explore our latest products with special prices and great quality.</p>
                </div>

                {isLoading ? (
                    <div className={style.loadingBox}>
                        <Spinner animation="border" variant="success" />
                        <p>Loading products...</p>
                    </div>
                ) : (
                    <>
                        {isFetching && (
                            <p className="text-center text-muted mb-3">
                                Updating products...
                            </p>
                        )}

                        {recentProducts.length === 0 ? (
                            <p className="text-center text-muted">
                                No products available at the moment.
                            </p>
                        ) : (
                            <Row className="g-4">
                                {recentProducts.map((product) => (
                                    <Col key={product._id} sm={6} md={4} lg={3}>
                                        <Card className={style.productCard}>

                                            <Link
                                                to={`/products/${product._id}`}
                                                className={style.productLink}
                                            >
                                                <div className={style.imageBox}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={product.imageCover}
                                                        alt={product.title}
                                                        className={style.productImage}
                                                    />

                                                    <span className={style.categoryBadge}>
                                                        {product.category?.name}
                                                    </span>
                                                </div>

                                                <Card.Body className={style.cardBody}>
                                                    <h5 className={style.productTitle}>
                                                        {product.title?.split(' ')?.slice(0, 3)?.join(' ') ||
                                                            'No title'}
                                                    </h5>

                                                    <p className={style.brandName}>
                                                        {product.brand?.name || 'FreshCart'}
                                                    </p>

                                                    <div className={style.rating}>
                                                        <span>
                                                            <i className="fas fa-star"></i>{' '}
                                                            {product.ratingsAverage}
                                                        </span>
                                                        <small>({product.ratingsQuantity})</small>
                                                    </div>
                                                </Card.Body>
                                            </Link>

                                            <div className={style.cardFooter}>
                                                <span className={style.price}>
                                                    {product.price} EGP
                                                </span>

                                                <Button
                                                    className={style.addBtn}
                                                    onClick={() => handleAddToCart(product._id)}
                                                    aria-label="Add product to cart"
                                                >
                                                    <i className="fas fa-cart-plus"></i>
                                                </Button>
                                            </div>

                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </>
                )}

            </Container>
        </section>
    );
}