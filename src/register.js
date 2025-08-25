import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      // เรียก API Backend โดยเปลี่ยนเป็นพอร์ต 4000
      const response = await fetch('http://localhost:4000/api/register', {
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
        setSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle specific server-side errors
        setErrors({ general: data.message || 'An error occurred during registration.' });
        setIsLoading(false);
      }
    } catch (error) {
      // Handle network or connection errors
      console.error('Registration network error:', error);
      setErrors({ general: 'Connection failed. Please check if the Node.js server is running and accessible.' });
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden">
        {/* Background */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: -1
          }}
        ></div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div 
                className="card border-0 shadow-lg text-center"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px'
                }}
              >
                <div className="card-body p-5">
                  <div className="mb-4">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white'
                      }}
                    >
                      <i className="bi bi-check-lg" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                  </div>
                  <h3 className="fw-bold text-success mb-3">Welcome Aboard! 🎉</h3>
                  <p className="text-muted mb-4">
                    Your account has been created successfully. 
                    Get ready to explore our amazing toy collection!
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <p className="small text-muted mt-2">Redirecting to login...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
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
            width: '250px',
            height: '250px',
            background: 'rgba(255,255,255,0.1)',
            top: '-125px',
            left: '-125px',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '180px',
            height: '180px',
            background: 'rgba(255,255,255,0.05)',
            bottom: '-90px',
            right: '-90px',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '120px',
            height: '120px',
            background: 'rgba(255,255,255,0.08)',
            top: '30%',
            right: '15%',
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
            <div className="col-md-6 col-lg-5">
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
                    <i className="bi bi-person-plus text-white" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                <h1 className="h2 fw-bold text-white mb-2">Join Our Community!</h1>
                <p className="text-white-50 mb-0">Create your account and start collecting</p>
              </div>

              {/* Registration Card */}
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
                    {errors.general && (
                      <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center mb-3" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2 text-danger"></i>
                        {errors.general}
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label fw-semibold text-dark">
                        <i className="bi bi-person me-2"></i>Username
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-lg border-0 shadow-sm ${errors.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a unique username"
                        disabled={isLoading}
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(248,249,250,0.8)',
                          padding: '12px 16px'
                        }}
                      />
                      {errors.username && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {errors.username}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold text-dark">
                        <i className="bi bi-lock me-2"></i>Password
                      </label>
                      <input
                        type="password"
                        className={`form-control form-control-lg border-0 shadow-sm ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a secure password"
                        disabled={isLoading}
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(248,249,250,0.8)',
                          padding: '12px 16px'
                        }}
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark">
                        <i className="bi bi-lock-fill me-2"></i>Confirm Password
                      </label>
                      <input
                        type="password"
                        className={`form-control form-control-lg border-0 shadow-sm ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                        disabled={isLoading}
                        style={{
                          borderRadius: '12px',
                          background: 'rgba(248,249,250,0.8)',
                          padding: '12px 16px'
                        }}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {errors.confirmPassword}
                        </div>
                      )}
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="fw-semibold" style={{ color: '#667eea', textDecoration: 'none' }}>
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Debug Info */}
              <div className="text-center mt-3">
                <small className="text-white-50">
                  {/* Note: This count will no longer be accurate since we are using a real database now */}
                  You're connecting to a real database now!
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default Register;
