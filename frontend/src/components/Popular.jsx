import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdSettings } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Popular.css';
import { FaStar } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

function Popular() {
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
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await axios.get('https://filmix-dfzo.onrender.com/api/popular');
                console.log("Gelen Veriler:", response.data);

                if (Array.isArray(response.data)) {
                    response.data.forEach(item => console.log("Poster URL:", item.poster));
                    setPopular(response.data);
                } else {
                    console.error("API response is not an array:", response.data);
                    setPopular([]);
                }
            } catch (error) {
                console.error("Popüler içerikler yüklenirken hata oluştu:", error.message);
            }
        };

        fetchPopular();
    }, []);

     // Toggle dropdown visibility
     const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };

    return (
        <div className="popular-wrapper">
            {/* Navbar */}
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

            {/* Popular Movies List */}
            <div className="container">
                <div className="popular-grid">
                    {popular.length > 0 ? (
                        popular.map((popular, index) => (
                            <div key={index} className="popular-card">
                                <img 
                                    src={
                                        popular.poster 
                                            ? (popular.poster.startsWith("http") 
                                                ? popular.poster 
                                                : `https://filmix-dfzo.onrender.com/${popular.poster}`
                                              ) 
                                            : 'https://picsum.photos/200/300'
                                    }
                                    alt={popular.title} 
                                    className="popular-image"
                                    onError={(e) => e.target.src = 'https://picsum.photos/200/300'} 
                                />
                                <div className="popular-info">
                                    <h4 className="popular-name">{popular.title}</h4>
                                    <FaRegCalendarAlt  style={{ color:'green',marginBottom: "6px" }} /> {popular.release_year} 
                                    <span className="serie-rating">   <span > -----</span><FaStar  style={{ marginBottom: "6px"}}/> </span>
              
                                        <span style={{ fontWeight: "bold"}}>{popular.rating}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-movies">No popular series found.</p>
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

export default Popular;
