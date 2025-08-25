import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ตรวจสอบว่าผู้ใช้ login แล้วหรือยัง
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/mainpage');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // เรียก API Backend โดยเปลี่ยนเป็นพอร์ต 4000
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login สำเร็จ
        localStorage.setItem('currentUser', JSON.stringify({
          username: data.user.username,
          token: data.token,
          loginTime: new Date().toISOString()
        }));
        
        // ไปหน้า mainpage
        navigate('/mainpage');
      } else {
        // Login ไม่สำเร็จ
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please check if the server is running.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Animated Background */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          zIndex: -2
        }}
      >
        {/* Floating Elements */}
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            top: '-150px',
            right: '-150px',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.05)',
            bottom: '-100px',
            left: '-100px',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.08)',
            top: '20%',
            left: '10%',
            animation: 'float 7s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100" style={{ zIndex: 1000 }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: 'white' }}>
            🧸 Toys Store
          </Link>
        </div>
      </nav>

      <div className="d-flex align-items-center justify-content-center min-vh-100 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-4">
              {/* Welcome Header */}
              <div className="text-center mb-4">
                <div className="mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <i className="bi bi-person-circle text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                <h1 className="h2 fw-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-white-50 mb-0">Sign in to your toy paradise account</p>
              </div>

              {/* Login Card */}
              <div 
                className="card border-0 shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px'
                }}
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center mb-3" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2 text-danger"></i>
                        {error}
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label fw-semibold text-dark">
                        <i className="bi bi-person me-2"></i>Username
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-0 shadow-sm"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        disabled={isLoading}
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(248,249,250,0.8)',
                          padding: '12px 16px'
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold text-dark">
                        <i className="bi bi-lock me-2"></i>Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg border-0 shadow-sm"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        disabled={isLoading}
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(248,249,250,0.8)',
                          padding: '12px 16px'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-lg w-100 fw-semibold border-0 shadow-sm mb-3"
                      disabled={isLoading}
                      style={{
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '12px'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Don't have an account?{' '}
                        <Link to="/register" className="fw-semibold" style={{ color: '#667eea', textDecoration: 'none' }}>
                          Create one here
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
