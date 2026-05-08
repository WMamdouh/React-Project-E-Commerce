import React from 'react';
import style from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className={style.notFoundPage}>
      <div className={style.card}>
        <div className={style.iconBox}>
          <i className="fas fa-map-signs"></i>
        </div>

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          Oops! The page you are looking for does not exist or may have been moved.
        </p>

        <div className={style.actions}>
          <Link to="/" className={style.homeBtn}>
            <i className="fas fa-home"></i>
            Back to Home
          </Link>

          <Link to="/products" className={style.productsBtn}>
            <i className="fas fa-shopping-basket"></i>
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}