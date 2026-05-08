import React, { useEffect, useState } from 'react';
import style from './CategoriesSlider.module.css';
import axios from 'axios';
import { Container, Carousel, Spinner } from 'react-bootstrap';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategories() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/categories'
      );

      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  function chunkArray(array, size) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  }

  const categoryGroups = chunkArray(categories, 4);

  return (
    <section className={style.categoriesSection}>
      <Container>
        <div className={style.sectionHeader}>
          <span>FreshCart Categories</span>
          <h2>Shop Popular Categories</h2>
          <p>Find your favorite products from our fresh categories.</p>
        </div>

        {loading ? (
          <div className={style.loadingBox}>
            <Spinner animation="border" variant="success" />
            <p>Loading categories...</p>
          </div>
        ) : (
          <Carousel
            indicators={true}
            controls={true}
            interval={3000}
            pause="hover"
            className={style.categoryCarousel}
          >
            {categoryGroups.map((group, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <div className={style.categoriesGrid}>
                  {group.map((category) => (
                    <div key={category._id} className={style.categoryCard}>
                      <div className={style.imageBox}>
                        <img
                          src={category.image}
                          alt={category.name}
                          className={style.categoryImage}
                        />
                      </div>

                      <h3>{category.name}</h3>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </section>
  );
}