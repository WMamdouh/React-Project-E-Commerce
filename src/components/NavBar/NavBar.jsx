import style from './NavBar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

export default function NavBar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <Navbar expand="lg" className={style.navbar}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={style.brand}>
          <span className={style.logoBox}>
            <img src={logo} alt="FreshCart Logo" className={style.logo} />
          </span>
          <span>FreshCart</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="freshcart-navbar" />

        <Navbar.Collapse id="freshcart-navbar">
          {userLogin ? (
            <Nav className={`mx-auto ${style.navLinks}`}>
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>

              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>

              <Nav.Link as={NavLink} to="/brands">
                Brands
              </Nav.Link>

              <Nav.Link as={NavLink} to="/cart" className={style.cartLink}>
                <div className={style.cartWrapper}>
                  <i className="fas fa-shopping-cart"></i>

                  {cart?.numOfCartItems > 0 && (
                    <span className={style.cartBadge}>
                      {cart.numOfCartItems}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
            </Nav>
          ) : (
            <div className={style.guestMessage}>
              <i className="fas fa-leaf"></i>
              <span>Fresh products delivered to your door</span>
            </div>
          )}

          <Nav className={style.authLinks}>
            {userLogin ? (
              <button type="button" onClick={handleLogout} className={style.logoutBtn}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className={style.loginBtn}>
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register" className={style.registerBtn}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}