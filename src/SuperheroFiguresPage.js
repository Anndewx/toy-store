import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// CartModal Component
const CartModal = ({ isOpen, onClose, cartItems, removeFromCart, getTotalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Shopping Cart</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <h5>Your cart is empty</h5>
                <p className="text-muted">Add some items to get started!</p>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="row align-items-center border-bottom py-3">
                    <div className="col-md-2">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ 
                          maxHeight: '60px', 
                          width: '60px',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <h6 className="mb-0">{item.name}</h6>
                    </div>
                    <div className="col-md-2">
                      <span className="fw-bold">${item.price}</span>
                    </div>
                    <div className="col-md-2">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="col-md-2">
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="row mt-4">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h5 className="card-title">Total: ${getTotalPrice()}</h5>
                        <button className="btn btn-dark w-100">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function SuperheroFiguresPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // ตรวจสอบ login status
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // สินค้า Superhero Figures
  const superheroFigures = [
    { id: 30, name: "Baby Groot", price: 39.78, image: "/images/superhero.jpg", onSale: false, rating: 4 },
    { id: 31, name: "Batman x Deadpool", price: 58.28, image: "/images/superhero1.jpg", onSale: false, rating: 5 },
    { id: 32, name: "Stormtrooper", price: 30.53, originalPrice: 52.11, image: "/images/superhero2.jpg", onSale: true, rating: 5 },
    { id: 33, name: "Spider-Man", price: 45.99, image: "/images/superhero.jpg", onSale: false, rating: 5 },
    { id: 34, name: "Iron Man", price: 62.50, originalPrice: 78.00, image: "/images/superhero1.jpg", onSale: true, rating: 5 },
    { id: 35, name: "Captain America", price: 48.75, image: "/images/superhero2.jpg", onSale: false, rating: 4 }
  ];

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index} 
        className={`bi-star${index < rating ? '-fill' : ''}`}
      ></i>
    ));
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/mainpage">Toys Store</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link" to="/mainpage">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/mainpage">All Products</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/popular">Popular Items</Link></li>
                  <li><Link className="dropdown-item" to="/newarrivals">New Arrivals</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/game-figures">Game Figures</Link></li>
                  <li><Link className="dropdown-item active" to="/superhero-figures">Superhero Figures</Link></li>
                  <li><Link className="dropdown-item" to="/gundam-models">Gundam Models</Link></li>
                  <li><Link className="dropdown-item" to="/anime-figures">Anime Figures</Link></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {/* Cart Button */}
              <button 
                className="btn btn-outline-dark me-3" 
                type="button"
                onClick={() => setIsCartOpen(true)}
              >
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  {getTotalItems()}
                </span>
              </button>

              {/* User Account Icon */}
              {currentUser ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-link p-0 border-0" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ textDecoration: 'none' }}
                  >
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '45px',
                        height: '45px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: '3px solid rgba(102, 126, 234, 0.2)',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      <i className="bi bi-person-fill" style={{ fontSize: '1.4rem' }}></i>
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0" aria-labelledby="userDropdown" style={{ minWidth: '180px', borderRadius: '12px', marginTop: '8px' }}>
                    <li className="px-3 py-3 text-center border-bottom">
                      <div className="fw-bold text-dark">{currentUser.username}</div>
                      <small className="text-muted">Member</small>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 text-danger d-flex align-items-center justify-content-center" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to="/login" className="btn btn-outline-primary">
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-dark py-4">
        <div className="container px-4 px-lg-5 text-center text-white">
          <h1 className="display-4 fw-bolder mb-2">Superhero Figures</h1>
          <p className="lead fw-normal text-white-50 mb-0">Legendary Heroes & Iconic Characters</p>
        </div>
      </header>

      {/* Products Section */}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {superheroFigures.map((product) => (
              <div key={product.id} className="col mb-5">
                <div className="card h-100">
                  {product.onSale && (
                    <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>
                      Sale
                    </div>
                  )}
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.name}
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.name}</h5>
                      {product.rating > 0 && (
                        <div className="d-flex justify-content-center small text-warning mb-2">
                          {renderStars(product.rating)}
                        </div>
                      )}
                      {product.originalPrice ? (
                        <>
                          <span className="text-muted text-decoration-line-through">${product.originalPrice}</span> ${product.price}
                        </>
                      ) : (
                        `$${product.price}`
                      )}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button 
                        className="btn btn-outline-dark mt-auto"
                        onClick={() => addToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Powered by Passion, Built for Fans &copy; 2025 Toy Paradise</p>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />
    </>
  );
}

export default SuperheroFiguresPage;