import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdSettings } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Movies.css';
import { FaStar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";



function Movies() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
      // User info state
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const user = localStorage.getItem("userInfo");
      console.log("userInfo from localStorage: ", user);  // Check the value of userInfo
  
      if (user) {
        try {
          const parsedUser = JSON.parse(user);  // Parse the user info
          setUserInfo(parsedUser);  // Set the user info in state
        } catch (error) {
          console.error("Error parsing user info: ", error);  // Handle parsing errors
        }
      }
    } else {
      console.warn("Token not found, user might not be logged in.");
    }
  }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear auth token
      navigate("/"); // Redirect to login
    };
    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/films');
                console.log("Gelen veriler:", response.data);
                setMovies(response.data);
            } catch (error) {
                console.error("Filmler yüklenirken hata oluştu:", error.message);
            }
        };

        fetchMovies();
    }, []);

      // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    return (
        <div className="movies-wrapper">
            <div className="navbar">
                <img className='logo' src="/logo2.gif" alt="Filmix Logo" style={{ width: "250px", height: "75px" }} />
                <Link to="/home"><h3>Home</h3></Link>
                <Link to="/movies"><h3>Movies</h3></Link>
                <Link to="/series"><h3>Series</h3></Link>
                <Link to="/popular"><h3>Popular</h3></Link>
                <div className="buttons">
                <Link to="/login"> <button className='btn btn-danger'>Logout</button></Link>
                <button className="btn btn-info" onClick={toggleDropdown}>
            <IoMdSettings size={30} color="black" />
          </button>
                </div>
                
            </div>
            

            <div className="container">
                <div className="movie-grid">
                    {movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <div key={index} className="movie-card">
                                <img 
                                    src={movie.poster || 'https://via.placeholder.com/150'} 
                                    alt={movie.title} 
                                    className="movie-image"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                />
                                <div className="movie-info">
                                    <h4 className="movie-name">{movie.title}</h4>
                                    <FaRegCalendarAlt  style={{ color:'green',marginBottom: "6px" }} /> {movie.release_year} 
                                    <span className="serie-rating">   <span > -----</span><FaStar  style={{ marginBottom: "6px"}}/> </span>
                                  
                                        <span style={{ fontWeight: "bold"}}>{movie.rating}</span>
                                        <p className="movie-duration"><strong>Duration:</strong> {movie.film_duration}</p>
                                </div>
                                </div>
                          
                        ))
                    ) : (
                        <p className="no-movies">No movies found.</p>
                    )}
                </div>
            </div>



         {/* User Info Dropdown */}
      {showDropdown && (
        <div className="user-info-dropdown">
          <ul >
            <li style={{fontWeight:"bold"}}><strong style={{color:"red"}}>USERNAME:</strong> {userInfo.userName}</li>
            <li style={{fontWeight:"bold"}}><strong style={{color:"red"}}>EMAİL:</strong> {userInfo.email}</li>
            <li style={{fontWeight:"bold"}}><strong style={{color:"red"}}>GSM:</strong> {userInfo.gsm}</li>
          </ul>
        </div>
      )}


        </div>
    );
}

export default Movies;
