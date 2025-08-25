import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

function AnalyticsPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('month');
  const navigate = useNavigate();

  // ตรวจสอบ login status
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Sample analytics data
  const salesByCategory = [
    { category: 'Gundam Models', sales: 25400, units: 127, percentage: 35 },
    { category: 'Superhero Figures', sales: 18900, units: 89, percentage: 26 },
    { category: 'Anime Figures', sales: 16200, units: 95, percentage: 22 },
    { category: 'Game Figures', sales: 12300, units: 67, percentage: 17 }
  ];

  const monthlyTrends = [
    { month: 'Oct', sales: 15200, orders: 85 },
    { month: 'Nov', sales: 18900, orders: 102 },
    { month: 'Dec', sales: 22400, orders: 134 },
    { month: 'Jan', sales: 19800, orders: 115 },
    { month: 'Feb', sales: 21600, orders: 128 },
    { month: 'Mar', sales: 24300, orders: 145 }
  ];

  const topProducts = [
    { name: "MG 1/100 GUNDAM EXIA", sales: 4200, units: 35, rating: 5 },
    { name: "MSN-04 Sazabi", sales: 3800, units: 28, rating: 5 },
    { name: "Batman x Deadpool", sales: 3200, units: 42, rating: 5 },
    { name: "Stormtrooper", sales: 2900, units: 55, rating: 5 },
    { name: "Asuka Langley Soryu", sales: 2600, units: 38, rating: 5 }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

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
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/analytics">Analytics</Link>
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
                  <li><Link className="dropdown-item" to="/superhero-figures">Superhero Figures</Link></li>
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
                      <Link className="dropdown-item py-2" to="/analytics">
                        <i className="bi bi-graph-up me-2"></i>Analytics
                      </Link>
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
          <h1 className="display-4 fw-bolder mb-2">
            <i className="bi bi-graph-up-arrow me-3"></i>Sales Analytics
          </h1>
          <p className="lead fw-normal text-white-50 mb-0">Data-Driven Insights for Better Business Decisions</p>
        </div>
      </header>

      {/* Analytics Dashboard */}
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5">
          
          {/* KPI Cards */}
          <div className="row mb-5">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="card-body text-white text-center">
                  <div className="h2 mb-2">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <h3 className="fw-bold mb-1">$72,800</h3>
                  <p className="mb-0">Total Revenue</p>
                  <small className="text-light">
                    <i className="bi bi-arrow-up"></i> +12.5% vs last month
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <div className="card-body text-white text-center">
                  <div className="h2 mb-2">
                    <i className="bi bi-bag-check"></i>
                  </div>
                  <h3 className="fw-bold mb-1">378</h3>
                  <p className="mb-0">Units Sold</p>
                  <small className="text-light">
                    <i className="bi bi-arrow-up"></i> +8.3% vs last month
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <div className="card-body text-white text-center">
                  <div className="h2 mb-2">
                    <i className="bi bi-people"></i>
                  </div>
                  <h3 className="fw-bold mb-1">145</h3>
                  <p className="mb-0">Orders</p>
                  <small className="text-light">
                    <i className="bi bi-arrow-up"></i> +15.2% vs last month
                  </small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <div className="card-body text-white text-center">
                  <div className="h2 mb-2">
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <h3 className="fw-bold mb-1">4.8</h3>
                  <p className="mb-0">Avg Rating</p>
                  <small className="text-light">
                    <i className="bi bi-arrow-up"></i> +0.2 vs last month
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="row mb-5">
            
            {/* Sales by Category */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                    Sales by Category
                  </h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesByCategory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, 'Sales']} />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-pie-chart-fill me-2 text-success"></i>
                    Sales Distribution
                  </h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category.split(' ')[0]} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sales"
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-graph-up me-2 text-info"></i>
                    Monthly Sales Trends
                  </h5>
                  <div className="btn-group" role="group">
                    <button 
                      type="button" 
                      className={`btn btn-sm ${selectedTimeFrame === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedTimeFrame('month')}
                    >
                      6 Months
                    </button>
                    <button 
                      type="button" 
                      className={`btn btn-sm ${selectedTimeFrame === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedTimeFrame('year')}
                    >
                      1 Year
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#82ca9d" 
                        strokeWidth={3}
                        dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products & PowerBI Section */}
          <div className="row">
            
            {/* Top Selling Products */}
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-trophy-fill me-2 text-warning"></i>
                    Top Selling Products
                  </h5>
                </div>
                <div className="card-body">
                  {topProducts.map((product, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                      <div className="d-flex align-items-center">
                        <div 
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <h6 className="mb-1 fw-bold">{product.name}</h6>
                          <small className="text-muted">{product.units} units sold</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">${product.sales.toLocaleString()}</div>
                        <div className="small text-warning">
                          {[...Array(product.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PowerBI Integration */}
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-microsoft me-2 text-primary"></i>
                    PowerBI Dashboard
                  </h5>
                </div>
                <div className="card-body">
                  {/* PowerBI Embed Section */}
                  <div 
                    className="d-flex align-items-center justify-content-center border rounded"
                    style={{ 
                      height: '300px', 
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      border: '2px dashed #dee2e6'
                    }}
                  >
                    <div className="text-center">
                      <i className="bi bi-graph-up text-muted" style={{ fontSize: '3rem' }}></i>
                      <h6 className="mt-3 text-muted">PowerBI Report Embed</h6>
                      <p className="small text-muted mb-3">
                        Connect your PowerBI workspace to display<br />
                        real-time analytics and reports here
                      </p>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-plus-circle me-2"></i>
                        Configure PowerBI
                      </button>
                    </div>
                  </div>
                  
                  {/* PowerBI Integration Instructions */}
                  <div className="mt-3">
                    <small className="text-muted">
                      <strong>Integration Steps:</strong><br />
                      1. Get PowerBI embed URL<br />
                      2. Configure authentication<br />
                      3. Replace placeholder with iframe
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PowerBI Example Code */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-dark text-white py-3">
                  <h6 className="card-title mb-0">
                    <i className="bi bi-code-slash me-2"></i>
                    PowerBI Integration Example
                  </h6>
                </div>
                <div className="card-body bg-light">
                  <pre className="mb-0" style={{ fontSize: '0.85rem' }}>
{`// PowerBI Embed Code Example
<iframe
  width="100%"
  height="400"
  src="https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&autoAuth=true"
  frameBorder="0"
  allowFullScreen="true"
></iframe>

// Or using PowerBI JavaScript API
import { models, Report, Embed } from 'powerbi-client';

const embedConfig = {
  type: 'report',
  id: 'YOUR_REPORT_ID',
  embedUrl: 'YOUR_EMBED_URL',
  accessToken: 'YOUR_ACCESS_TOKEN',
  tokenType: models.TokenType.Embed,
  settings: {
    panes: {
      filters: { expanded: false, visible: false }
    }
  }
};`}
                  </pre>
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

export default AnalyticsPage;