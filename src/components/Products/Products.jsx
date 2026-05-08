import React, { useState, useContext, useEffect } from 'react';
import style from './Products.module.css';

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Form
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const { data, isLoading, isError, error, isFetching } = useProduct();
  const { addToCart, setCart } = useContext(CartContext);

  const products = data?.data?.data || [];

  async function getCategories() {
    try {

      setLoadingCategories(true);

      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/categories'
      );

      setCategories(data.data);

    } catch (error) {

      console.error('Error fetching categories:', error);

      toast.error('Failed to load categories');

    } finally {

      setLoadingCategories(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const filteredProducts = products.filter((product) => {

    const matchSearch =
      product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory
        ? product.category?._id === selectedCategory
        : true;

    return matchSearch && matchCategory;
  });

  async function handleAddToCart(productId) {

    try {

      setLoadingId(productId);

      const response = await addToCart(productId);

      if (response?.status === 'success') {

        toast.success('Product added to cart successfully!');

        setCart(response);

      } else {
        toast.error('Failed to add product to cart');
      }

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        'Network error occurred'
      );

    } finally {

      setLoadingId(null);
    }
  }

  if (isError) {
    return (
      <section className={style.productsPage}>
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
    <section className={style.productsPage}>
      <Container>

        {/* HEADER */}
        <div className={style.pageHeader}>
          <span>FreshCart Store</span>
          <h1>All Products</h1>
          <p>
            Browse all available products and find the best items for your cart.
          </p>
        </div>

        {/* SEARCH */}
        <div className={style.searchBox}>
          <i className="fas fa-search"></i>

          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.searchInput}
          />
        </div>

        <div className="text-center mb-4">

          {loadingCategories ? (
            <Spinner animation="border" size="sm" variant="success" />
          ) : (
            <Form.Select
              style={{
                maxWidth: "320px",
                margin: "0 auto",
                borderRadius: "999px"
              }}
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
            >

              <option value="">All Categories</option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}

            </Form.Select>
          )}

        </div>

        {/* PRODUCTS */}
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

            {filteredProducts.length === 0 ? (
              <div className={style.noProducts}>
                <i className="fas fa-box-open"></i>
                <h2>No products found</h2>
                <p>Try another search or category</p>
              </div>
            ) : (

              <Row className="g-4">

                {filteredProducts.map((product) => (

                  <Col key={product._id} sm={6} md={4} lg={3}>

                    <Card className={style.productCard}>

                      <Link
                        to={`/products/${product._id}`}
                        className={style.productLink}
                      >

                        <div className={style.imageBox}>

                          <Card.Img
                            src={product.imageCover}
                            className={style.productImage}
                            loading="lazy"
                          />

                          <span className={style.categoryBadge}>
                            {product.category?.name}
                          </span>

                        </div>

                        <Card.Body className={style.cardBody}>

                          <h5 className={style.productTitle}>
                            {product.title
                              ?.split(' ')
                              ?.slice(0, 3)
                              ?.join(' ')}
                          </h5>

                          <p className={style.brandName}>
                            {product.brand?.name || 'FreshCart'}
                          </p>

                          <div className={style.rating}>
                            <span>
                              <i className="fas fa-star"></i>{' '}
                              {product.ratingsAverage}
                            </span>
                            <small>
                              ({product.ratingsQuantity})
                            </small>
                          </div>

                        </Card.Body>

                      </Link>

                      <div className={style.cardFooter}>

                        <span className={style.price}>
                          {new Intl.NumberFormat('en-EG')
                            .format(product.price)} EGP
                        </span>

                        <Button
                          className={style.addBtn}
                          onClick={() =>
                            handleAddToCart(product._id)
                          }
                          disabled={loadingId === product._id}
                        >
                          {loadingId === product._id ? (
                            <Spinner size="sm" />
                          ) : (
                            <i className="fas fa-cart-plus"></i>
                          )}
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