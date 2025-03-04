import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://filmix-dfzo.onrender.com/api/login', { email, password });

      console.log(response.data);  // Log the response to see the returned data

      // Save the user info and token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user)); // Save user info correctly
  // Check if the user is admin
  if (email === "admin@gmail.com" && password === "123") {
    navigate('/adminpage');  // Navigate to admin page if admin credentials are correct
  } else {
    navigate('/home');  // Navigate to home page for other users
  }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <img className='logo' src="./public/logo2.gif" alt="Filmix Logo" style={{ width: "300px", height: "75px", borderRadius: "15px" }} />

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login To Filmix</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="ornek@filmix.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password" // Toggle between 'text' and 'password'
                      className="form-control"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  
                  </div>

                  <button type="submit" className="btn btn-danger w-100 py-2">
                    Login
                  </button>

                  <div className="text-center mt-3">
                    <a href="#!" className="text-decoration-none">Forgot Password?</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="card mt-3 shadow">
              <div className="card-body text-center">
                <span>Don't Have Account?</span>  <Link to="/signup" style={{textDecoration:"none"}}> Sign Up</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
