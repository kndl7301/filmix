import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginPage.css';

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [gsm, setGsm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing the password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log data being sent to the backend for debugging
      console.log('Sending request:', { userName, gsm, email, password });

      const response = await axios.post('https://filmix-dfzo.onrender.com/api/signup', { userName, gsm, email, password });
      
      // Check the backend response
      console.log('Response:', response.data);

      // If registration is successful, navigate to login page or dashboard
      alert('Registration successful! Now you can login.');
      navigate('/login');
    } catch (err) {
      // Log and display error if signup fails
      console.error("Signup failed:", err.response?.data || err);
      setError('Signup failed. Please try again.');
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <img className='logo' src="./public/logo2.gif" alt="Filmix Logo" style={{ width: "300px", height: "75px", borderRadius: "15px" }} />

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Sign Up To Filmix</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter your username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="gsm" className="form-label">GSM</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gsm"
                      placeholder="Enter your GSM"
                      value={gsm}
                      onChange={(e) => setGsm(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@filmix.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    
                  </div>

                  <button type="submit" className="btn btn-success w-100 py-2">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>

            <div className="card mt-3 shadow">
              <div className="card-body text-center">
                <span>Already Have an Account?</span>  <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
