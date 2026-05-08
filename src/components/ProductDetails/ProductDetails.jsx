import React, { useEffect, useState, useContext } from 'react';
import style from './ProductDetails.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Carousel,
} from 'react-bootstrap';

import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  const [productDetails, setProductDetails] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loadingCart, setLoadingCart] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    addToCart,
    setCart
  } = useContext(CartContext);

  async function handleAddToCart(productId) {

    try {

      setLoadingCart(true);

      const response = await addToCart(productId);

      if (response?.status === 'success') {

        toast.success(
          'Product added to cart successfully!'
        );

        // update cart context
        setCart(response);

      } else {

        toast.error(
          'Failed to add product to cart. Please try again.'
        );

      }

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        'Network error. Please try again.'
      );

    } finally {

      setLoadingCart(false);

    }
  }

  async function getProductDetails(productId) {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );

      setProductDetails(data.data);

      getRelatedProducts(
        data.data.category?._id,
        data.data._id
      );

    } catch (error) {

      console.error(
        'Error fetching product details:',
        error
      );

    } finally {

      setLoading(false);

    }
  }

  async function getRelatedProducts(
    categoryId,
    currentProductId
  ) {

    try {

      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/products'
      );

      const related = data.data.filter(
        (product) =>
          product.category?._id === categoryId &&
          product._id !== currentProductId
      );

      setRelatedProducts(related);

    } catch (error) {

      console.error(
        'Error fetching related products:',
        error
      );

    }
  }

  function chunkArray(array, size) {

    const result = [];

    for (let i = 0; i < array.length; i += size) {

      result.push(array.slice(i, i + size));

    }

    return result;
  }

  useEffect(() => {

    getProductDetails(id);

  }, [id]);

  if (loading) {

    return (
      <section className={style.detailsPage}>

        <div className={style.loadingBox}>

          <Spinner
            animation="border"
            variant="success"
          />

          <p>Loading product details...</p>

        </div>

      </section>
    );
  }

  if (!productDetails) {

    return (
      <section className={style.detailsPage}>

        <Container>

          <div className={style.notFound}>

            <i className="fas fa-box-open"></i>

            <h2>Product not found</h2>

            <p>
              Sorry, we could not find this product.
            </p>

            <Button
              onClick={() => navigate('/products')}
              className={style.backBtn}
            >
              Back to Products
            </Button>

          </div>

        </Container>

      </section>
    );
  }

  const productImages =
    productDetails.images?.length > 0
      ? productDetails.images
      : [productDetails.imageCover];

  const relatedGroups = chunkArray(relatedProducts, 4);

  return (
    <section className={style.detailsPage}>

      <Container>

        <div className={style.detailsCard}>

          <Row className="align-items-center g-4">

            <Col md={6}>

              <div className={style.imageBox}>

                <Carousel
                  className={style.productSlider}
                  interval={2500}
                  pause="hover"
                  indicators={true}
                  controls={true}
                >

                  {productImages.map((image, index) => (

                    <Carousel.Item key={index}>

                      <div className={style.slideItem}>

                        <img
                          src={image}
                          alt={`${productDetails.title} ${index + 1}`}
                          className={style.productImage}
                          loading="lazy"
                        />

                      </div>

                    </Carousel.Item>

                  ))}

                </Carousel>

                <span className={style.categoryBadge}>
                  {productDetails.category?.name}
                </span>

              </div>

            </Col>

            <Col md={6}>

              <div className={style.infoBox}>

                <span className={style.brand}>
                  {
                    productDetails.brand?.name ||
                    'FreshCart'
                  }
                </span>

                <h1>{productDetails.title}</h1>

                <div className={style.ratingBox}>

                  <span>
                    <i className="fas fa-star"></i>

                    {productDetails.ratingsAverage || 0}
                  </span>

                  <small>
                    {
                      productDetails.ratingsQuantity || 0
                    } reviews
                  </small>

                </div>

                <p className={style.description}>
                  {productDetails.description}
                </p>

                <div className={style.priceBox}>

                  <span>Price</span>

                  <h2>
                    {
                      new Intl.NumberFormat('en-EG')
                        .format(productDetails.price)
                    } EGP
                  </h2>

                </div>

                <div className={style.actions}>

                  <Button
                    className={style.addBtn}
                    onClick={() =>
                      handleAddToCart(productDetails._id)
                    }
                    disabled={loadingCart}
                  >

                    {loadingCart ? (

                      <Spinner
                        animation="border"
                        size="sm"
                      />

                    ) : (

                      <>
                        <i className="fas fa-cart-plus"></i>
                        Add to Cart
                      </>

                    )}

                  </Button>

                  <Button
                    type="button"
                    className={style.backBtn}
                    onClick={() => navigate('/products')}
                  >

                    <i className="fas fa-arrow-left"></i>

                    Back

                  </Button>

                </div>

              </div>

            </Col>

          </Row>

        </div>

        {relatedProducts.length > 0 && (

          <div className={style.relatedSection}>

            <div className={style.relatedHeader}>

              <span>Related Products</span>

              <h2>
                More from {
                  productDetails.category?.name
                }
              </h2>

              <p>
                You may also like these products
                from the same category.
              </p>

            </div>

            <Carousel
              indicators={true}
              controls={true}
              interval={3000}
              pause="hover"
              className={style.relatedCarousel}
            >

              {relatedGroups.map((group, groupIndex) => (

                <Carousel.Item key={groupIndex}>

                  <div className={style.relatedGrid}>

                    {group.map((product) => (

                      <div
                        key={product._id}
                        className={style.relatedCard}
                        onClick={() =>
                          navigate(`/products/${product._id}`)
                        }
                      >

                        <div className={style.relatedImageBox}>

                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className={style.relatedImage}
                            loading="lazy"
                          />

                        </div>

                        <div className={style.relatedBody}>

                          <span className={style.relatedCategory}>
                            {product.category?.name}
                          </span>

                          <h3>
                            {
                              product.title
                                .split(' ')
                                .slice(0, 3)
                                .join(' ')
                            }
                          </h3>

                          <div className={style.relatedRate}>

                            <span>
                              <i className="fas fa-star"></i>

                              {product.ratingsAverage || 0}
                            </span>

                          </div>

                          <div className={style.relatedFooter}>

                            <strong>
                              {
                                new Intl.NumberFormat('en-EG')
                                  .format(product.price)
                              } EGP
                            </strong>

                            <button type="button">

                              <i className="fas fa-eye"></i>

                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </Carousel.Item>

              ))}

            </Carousel>

          </div>

        )}

      </Container>

    </section>
  );
}