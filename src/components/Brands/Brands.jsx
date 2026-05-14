import React, { useEffect, useState } from 'react';
import style from './Brands.module.css';
import axios from 'axios';
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brandProducts, setBrandProducts] = useState([]);
    const [loadingBrandProducts, setLoadingBrandProducts] = useState(false);
    const [showModal, setShowModal] = useState(false);

    async function getBrands() {
        try {
            setLoading(true);
            setErrorMessage('');

            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/brands'
            );

            setBrands(data.data || []);
        } catch (error) {
            console.error('Error fetching brands:', error);

            setErrorMessage('Something went wrong while loading brands.');
            toast.error('Failed to load brands');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    function getBrandDescription(brandName) {
        const descriptions = [
            `${brandName} is known for dependable products, clean design, and everyday value.`,
            `${brandName} offers popular picks for shoppers who care about quality and style.`,
            `${brandName} brings together trusted items that fit modern shopping needs.`,
            `${brandName} focuses on useful products with strong appeal and reliable choices.`,
        ];

        const descriptionIndex = brandName.length % descriptions.length;

        return descriptions[descriptionIndex];
    }

    async function handleShowBrandProducts(brand) {
        try {
            setSelectedBrand(brand);
            setBrandProducts([]);
            setShowModal(true);
            setLoadingBrandProducts(true);

            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/products'
            );

            const popularProducts = data.data
                .filter((product) => product.brand?._id === brand._id)
                .sort((firstProduct, secondProduct) => {
                    const reviewsDifference =
                        (secondProduct.ratingsQuantity || 0) -
                        (firstProduct.ratingsQuantity || 0);

                    if (reviewsDifference !== 0) {
                        return reviewsDifference;
                    }

                    return (
                        (secondProduct.ratingsAverage || 0) -
                        (firstProduct.ratingsAverage || 0)
                    );
                })
                .slice(0, 4);

            setBrandProducts(popularProducts);
        } catch (error) {
            console.error('Error fetching brand products:', error);
            toast.error('Failed to load brand products');
        } finally {
            setLoadingBrandProducts(false);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
        setSelectedBrand(null);
        setBrandProducts([]);
    }

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className={style.brandsPage}>
            <Container>
                <div className={style.pageHeader}>
                    <span>FreshCart Brands</span>
                    <h1>Shop By Brand</h1>
                    <p>Discover trusted brands and explore more products from names you love.</p>
                </div>

                <div className={style.searchBox}>
                    <i className="fas fa-search"></i>

                    <Form.Control
                        type="text"
                        placeholder="Search for brands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={style.searchInput}
                    />
                </div>

                {errorMessage ? (
                    <div className="alert alert-danger text-center">
                        {errorMessage}
                    </div>
                ) : loading ? (
                    <div className={style.loadingBox}>
                        <Spinner animation="border" variant="success" />
                        <p>Loading brands...</p>
                    </div>
                ) : filteredBrands.length === 0 ? (
                    <div className={style.noBrands}>
                        <i className="fas fa-tags"></i>
                        <h2>No brands found</h2>
                        <p>Try another brand name</p>
                    </div>
                ) : (
                    <Row className="g-4">
                        {filteredBrands.map((brand) => (
                            <Col key={brand._id} sm={6} md={4} lg={3}>
                                <Card className={style.brandCard}>
                                    <div className={style.imageBox}>
                                        <Card.Img
                                            src={brand.image}
                                            alt={brand.name}
                                            className={style.brandImage}
                                            loading="lazy"
                                        />
                                    </div>

                                    <Card.Body className={style.cardBody}>
                                        <h2 className={style.brandName}>{brand.name}</h2>
                                        <p className={style.brandDescription}>
                                            {getBrandDescription(brand.name)}
                                        </p>
                                       

                                        <Button
                                            type="button"
                                            className={style.brandBtn}
                                            onClick={() => handleShowBrandProducts(brand)}
                                        >
                                            <i className="fas fa-eye"></i>
                                            View Popular Products
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                className={style.brandModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedBrand ? `${selectedBrand.name} Popular Products` : 'Popular Products'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {loadingBrandProducts ? (
                        <div className={style.modalLoading}>
                            <Spinner animation="border" variant="success" />
                            <p>Loading popular products...</p>
                        </div>
                    ) : brandProducts.length === 0 ? (
                        <div className={style.modalEmpty}>
                            <i className="fas fa-box-open"></i>
                            <h3>No products found</h3>
                            <p>There are no available products for this brand right now.</p>
                        </div>
                    ) : (
                        <Row className="g-3">
                            {brandProducts.map((product) => (
                                <Col key={product._id} sm={6}>
                                    <Link
                                        to={`/products/${product._id}`}
                                        className={style.productPreview}
                                        onClick={handleCloseModal}
                                    >
                                        <div className={style.productImageBox}>
                                            <img
                                                src={product.imageCover}
                                                alt={product.title}
                                                className={style.productImage}
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className={style.productInfo}>
                                            <span>{product.category?.name || selectedBrand?.name}</span>
                                            <h3>
                                                {product.title
                                                    ?.split(' ')
                                                    ?.slice(0, 4)
                                                    ?.join(' ')}
                                            </h3>

                                            <div className={style.productMeta}>
                                                <small>
                                                    <i className="fas fa-star"></i>
                                                    {product.ratingsAverage || 0}
                                                    {' '}
                                                    ({product.ratingsQuantity || 0})
                                                </small>
                                                <strong>
                                                    {new Intl.NumberFormat('en-EG').format(product.price)} EGP
                                                </strong>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Modal.Body>
            </Modal>
        </section>
    );
}
