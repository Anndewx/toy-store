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

function AboutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // ตรวจสอบ login status
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
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
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
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
          <h1 className="display-4 fw-bolder mb-2">About Us</h1>
          <p className="lead fw-normal text-white-50 mb-0">Discover Our Story & Passion for Collectibles</p>
        </div>
      </header>

      {/* About Content */}
      <section className="py-5">
        <div className="container px-4 px-lg-5">
          {/* Hero Section */}
          <div className="row gx-4 gx-lg-5 align-items-center mb-5">
            <div className="col-md-6">
              <div className="text-center">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-heart-fill" style={{ fontSize: '3rem' }}></i>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bolder mb-3">Welcome to Toy Paradise</h2>
              <p className="lead">
                We are passionate collectors and enthusiasts dedicated to bringing you the finest selection of toys, figures, and collectibles from around the world.
              </p>
              <p className="text-muted">
                Since our founding, we've been committed to providing authentic, high-quality items that spark joy and nostalgia in collectors of all ages.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="row gx-4 gx-lg-5 mb-5">
            <div className="col-12">
              <h2 className="text-center fw-bolder mb-5">Our Values</h2>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-star-fill" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Quality First</h4>
                  <p className="text-muted mb-0">
                    We carefully curate our selection to ensure every item meets our high standards for authenticity and craftsmanship.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-people-fill" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Community</h4>
                  <p className="text-muted mb-0">
                    We believe in building a community of collectors who share the same passion for amazing toys and collectibles.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #dc3545, #e83e8c)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-lightning-fill" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Innovation</h4>
                  <p className="text-muted mb-0">
                    We constantly seek out the latest releases and emerging trends to bring you the newest and most exciting products.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="row gx-4 gx-lg-5 mb-5">
            <div className="col-12">
              <div 
                className="card border-0 shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}
              >
                <div className="card-body p-5">
                  <h2 className="text-center fw-bolder mb-5">Our Impact</h2>
                  <div className="row text-center">
                    <div className="col-md-3 mb-4">
                      <div className="h2 fw-bold">10,000+</div>
                      <p className="mb-0">Happy Customers</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="h2 fw-bold">5,000+</div>
                      <p className="mb-0">Products Sold</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="h2 fw-bold">50+</div>
                      <p className="mb-0">Brand Partners</p>
                    </div>
                    <div className="col-md-3 mb-4">
                      <div className="h2 fw-bold">5 Years</div>
                      <p className="mb-0">In Business</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="row gx-4 gx-lg-5 mb-5">
            <div className="col-12">
              <h2 className="text-center fw-bolder mb-5">Meet Our Team</h2>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Alex Johnson</h4>
                  <p className="text-primary mb-2">Founder & CEO</p>
                  <p className="text-muted small">
                    Passionate collector with 15+ years of experience in the toy industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Sarah Chen</h4>
                  <p className="text-success mb-2">Head of Curation</p>
                  <p className="text-muted small">
                    Expert in anime and manga collectibles with an eye for quality and authenticity.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #ffc107, #fd7e14)',
                      color: 'white'
                    }}
                  >
                    <i className="bi bi-person-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4 className="fw-bold">Mike Rodriguez</h4>
                  <p className="text-warning mb-2">Customer Success</p>
                  <p className="text-muted small">
                    Dedicated to ensuring every customer has an amazing experience with us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="row gx-4 gx-lg-5">
            <div className="col-12">
              <div className="text-center">
                <h2 className="fw-bolder mb-3">Ready to Start Collecting?</h2>
                <p className="lead mb-4">
                  Join thousands of satisfied customers and discover your next favorite collectible today!
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/mainpage" className="btn btn-primary btn-lg">
                    <i className="bi bi-shop me-2"></i>Shop Now
                  </Link>
                  <button className="btn btn-outline-primary btn-lg">
                    <i className="bi bi-envelope me-2"></i>Contact Us
                  </button>
                </div>
              </div>
            </div>
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

export default AboutPage;