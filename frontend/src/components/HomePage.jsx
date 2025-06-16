import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";
import { IoMdSettings } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa";
import axios from "axios"; // Import Axios for API calls

function HomePage() {
  const navigate = useNavigate();

  // State to handle dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // User info state
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    gsm: "", // Add gsm to state
  });

  // State to handle the message form
  const [messageInfo, setMessageInfo] = useState({
    name:"",
    email: "",
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = localStorage.getItem("userInfo");
      console.log("userInfo from localStorage: ", user); // Check the value of userInfo

      if (user) {
        try {
          const parsedUser = JSON.parse(user); // Parse the user info
          setUserInfo(parsedUser); // Set the user info in state
        } catch (error) {
          console.error("Error parsing user info: ", error); // Handle parsing errors
        }
      }
    } else {
      console.warn("Token not found, user might not be logged in.");
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    localStorage.removeItem("userInfo"); // Clear user info from localStorage
    navigate("/"); // Redirect to login
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle form submission to send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://filmix-dfzo.onrender.com/api/messages", messageInfo);
      alert("Message sent successfully!");
      setMessageInfo({ name:"",email: "",  message: "" }); // Clear the form
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="homepage-wrapper">
      <div className="navbar">
        <img
          className="logo"
          src="/logo2.gif"
          alt="Filmix Logo"
          style={{ width: "250px", height: "75px" }}
        />
        <Link to="/home">
          <h3>Home</h3>
        </Link>
        <Link to="/movies">
          <h3>Movies</h3>
        </Link>
        <Link to="/series">
          <h3>Series</h3>
        </Link>
        <Link to="/popular">
          <h3>Popular</h3>
        </Link>

        <div className="buttons">
          <Link to="/login">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </Link>
          <button className="btn btn-info" onClick={toggleDropdown}>
            <IoMdSettings size={30} color="black" />
          </button>
        </div>
      </div>

      <div className="container">
        <div className="yazı">
          <h1>
            Unlimited movies, TV
            <br />
            series and much more
          </h1>

          <p>Prices starting from 10$. You can cancel at any time.</p>
          <br />
          <span>
            Are you ready to watch? To become a member or access your account
            again, all you have to do is enter your e-mail address.
          </span>
        </div>
        <br />
        <div className="contact">
          <input type="text" placeholder="E-mail Address" />
          <span>s</span>
          <button className="btn btn-danger" style={{ width: "150px" }}>
            Start <FaGreaterThan />
          </button>
        </div>
      </div>

      {/* User Info Dropdown */}
      {showDropdown && (
        <div className="user-info-dropdown">
          <ul>
       
            <li style={{ fontWeight: "bold" }}>
              <strong style={{ color: "red" }}>USERNAME:</strong> {userInfo.userName}
            </li>
            <li style={{ fontWeight: "bold" }}>
              <strong style={{ color: "red" }}>EMAİL:</strong> {userInfo.email}
            </li>
            <li style={{ fontWeight: "bold" }}>
              <strong style={{ color: "red" }}>GSM:</strong> {userInfo.gsm}
            </li>
          </ul>
        </div>
      )}

<div className="footer container ">

    
      {/* Message Section */}
      <div className="message-section contact-us" style={{marginLeft:"-90px"}}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSendMessage}>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name Surname"
              value={messageInfo.name}
              onChange={(e) => setMessageInfo({ ...messageInfo, name: e.target.value })}
              required
            />
          </div><br />
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Your Gmail"
              value={messageInfo.email}
              onChange={(e) => setMessageInfo({ ...messageInfo, email: e.target.value })}
              required
            />
          </div><br />
     
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Your Message"
              value={messageInfo.message}
              onChange={(e) => setMessageInfo({ ...messageInfo, message: e.target.value })}
              required
            ></textarea><br />
          </div>
          <button type="submit" className="btn btn-success">
            Send Message
          </button>
        </form>
      </div>
    

      </div>
        </div>
  );
}

export default HomePage;
