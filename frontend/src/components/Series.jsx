import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdSettings } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Series.css';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Series() {
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

const [series,setSeries]=useState([])

    useEffect (()=>{
        const fetchSeries =async ()=>{
            try {
                const response = await axios.get('http://localhost:5000/api/series');
                console.log("Gelen Veriler ",response.data);
                setSeries(response.data);
                
            } catch (error) {
                console.error("Diziler  yüklenirken hata oluştu:", error.message);
            }
        };
        fetchSeries();
    }, 
    [])
    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };

  return (
    <div className="series-wrapper">
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
                <div className="serie-grid">
                    {series.length > 0 ? (
                        series.map((series, index) => (
                            <div key={index} className="serie-card">
                               <Link to={`/series/${series.id}`} className="serie-card">
                                <img 
                                    src={series.poster || 'https://via.placeholder.com/150'} 
                                    alt={series.title} 
                                    className="serie-image"
                                    onError={(e) => e.target.src = 'https://picsum.photos/200/300'}
                                />
                                <div className="serie-info">
                                  <h4 className="serie-name">{series.title}</h4>
               
                                <FaRegCalendarAlt  style={{ color:'green',marginBottom: "6px" }} /> {series.release_year} 
                                    <span className="serie-rating">   <span > -----</span><FaStar  style={{ marginBottom: "6px"}}/> </span>
              
                                        <span style={{ fontWeight: "bold"}}>{series.rating}</span>
       
                                </div>
                               </Link>

                            </div>
                        ))
                    ) : (
                        <p className="no-movies">No Series found.</p>
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
  )
}

export default Series
