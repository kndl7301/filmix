import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { IoMdSettings } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SeriesDetail.css';

function SeriesDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [series, setSeries] = useState(null);
    const [userInfo, setUserInfo] = useState({
        userName: "",
        email: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const user = localStorage.getItem("userInfo");
            if (user) {
                try {
                    setUserInfo(JSON.parse(user));
                } catch (error) {
                    console.error("Error parsing user info:", error);
                }
            }
        } else {
            console.warn("Token not found, user might not be logged in.");
        }
    }, []);

    useEffect(() => {
        const fetchSeriesDetail = async () => {
            try {
                const response = await axios.get(`https://filmix-dfzo.onrender.com/api/series/${id}`);
                setSeries(response.data);
            } catch (error) {
                console.error("Error fetching series details:", error.message);
            }
        };
        fetchSeriesDetail();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/login"); 
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (!series) return <p>Loading...</p>;

    return (
        <div className="series-detail">
            <div className="navbar">
                <img className='logo' src="/logo2.gif" alt="Filmix Logo" style={{ width: "250px", height: "75px" }} />
                <Link to="/home"><h3>Home</h3></Link>
                <Link to="/movies"><h3>Movies</h3></Link>
                <Link to="/series"><h3>Series</h3></Link>
                <Link to="/popular"><h3>Popular</h3></Link>
                <div className="buttons">
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    <button className="btn btn-info" onClick={toggleDropdown}>
                        <IoMdSettings size={30} color="black" />
                    </button>
                </div>
            </div>

            {/* Episode List */}
            <div className="episode-list container ">
                {series.episodes && series.episodes.length > 0 ? (
                    series.episodes.map((episode) => (
                        <div key={episode.episode_id} className="episode-card">
                            <img 
                                src={series.poster || 'https://via.placeholder.com/150'} 
                                alt={episode.title} 
                                className='serie-image' 
                            />
                            <div className="episode-info">
                                <h4 className="episode-name">{episode.title}</h4>
                                <h5 className="episode-name">{episode.episode_season}</h5>                               
                                <p className="episode-duration"><strong>Duration:</strong> {episode.duration}</p>
                                <p className="episode-release-date"><strong>Release Date:</strong> {episode.release_date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p >  <img src={series.poster || 'https://via.placeholder.com/150'}  alt="" /><strong style={{color:"white"}}> <br />No episodes available related with  this serie yet </strong> </p>
                  
                    
                    
                )}
            </div>
        </div>
    );
}

export default SeriesDetail;
