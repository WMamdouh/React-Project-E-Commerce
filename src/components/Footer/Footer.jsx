import React from 'react';
import style from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerTop}>
          <div className={style.brandBox}>
            <h2>
              <i className="fas fa-shopping-basket"></i>
              FreshCart
            </h2>

            <p>
              FreshCart helps you shop fresh products, groceries, and daily needs
              with a smooth and fast online experience.
            </p>

            <div className={style.socialLinks}>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className={style.footerColumn}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/brands">Brands</a></li>
            </ul>
          </div>

          <div className={style.footerColumn}>
            <h3>Account</h3>
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          <div className={style.footerColumn}>
            <h3>Contact</h3>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                support@freshcart.com
              </li>
              <li>
                <i className="fas fa-phone"></i>
                +20 100 000 0000
              </li>
              <li>
                <i className="fas fa-location-dot"></i>
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        <div className={style.footerBottom}>
          <p>© 2026 FreshCart. All rights reserved.</p>

          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}