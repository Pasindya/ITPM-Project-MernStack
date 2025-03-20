import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import '../CSS/Packlogin.css';

function Packlogin() {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Hardcoded credentials
    const correctEmail = 'pasindya@gmail.com';
    const correctPassword = 'pasi1234';

    // Validate email and password
    if (email === correctEmail && password === correctPassword) {
      setError(''); // Clear error message
      setSuccess('Login successful! Redirecting...'); // Set success message
      setTimeout(() => {
        navigate('/adminpkg'); // Navigate to Packhome page after 2 seconds
      }, 2000);
    } else {
      setSuccess(''); // Clear success message
      setError('Invalid email or password. Please try again.'); // Set error message
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Image on the left side */}
      <div className="login-image">
        <img
          src="/Booking/lo.jpg" // Replace with your image path
          alt="Login Illustration"
        />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h2>Login</h2>
        <p className="login-description">
          To log in as an administrator, please fill out the form below.
        </p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Packlogin;