import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RiMovie2Fill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminPage.css';
import axios from 'axios';

function AdminPage() {
  

  const [dashboardData, setDashboardData] = useState({
    movies: 0,
    series: 0,
    episodes: 0,
    popular:0,
    users: 0,
    messages: 0,
  });

  useEffect(() => {

      // Check if the user is an admin
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // If the user is not admin, redirect them to the home page
      if (!userInfo || userInfo.email !== "admin@gmail.com") {
        navigate('/home');
      }

    const fetchDashboardData = async () => {
      try {
        // Fetch the count for movies
        const movieResponse = await axios.get("https://filmix-dfzo.onrender.com/api/films");
        const movieCount = movieResponse.data.length;

        // Fetch the count for series
        const seriesResponse = await axios.get("https://filmix-dfzo.onrender.com/api/series");
        const seriesCount = seriesResponse.data.length;

        // Count the total number of episodes across all series
        let totalEpisodes = 0;
        seriesResponse.data.forEach(series => {
          totalEpisodes += series.episodes.length;
        });

        // Fetch the count for popular movie and series
        const popularResponse = await axios.get("https://filmix-dfzo.onrender.com/api/popular");
        const popularCount = popularResponse.data.length;

        // Fetch the count for users
        const userResponse = await axios.get("https://filmix-dfzo.onrender.com/api/users");
        const userCount = userResponse.data.length;

        // Fetch the count for messages
        // Assuming you have an endpoint for messages (replace with actual endpoint)
        const messageResponse = await axios.get("https://filmix-dfzo.onrender.com/api/messages");
          const messageCount = messageResponse.data.length;

        // Set the state with the fetched counts
        setDashboardData({
          movies: movieCount,
          series: seriesCount,
          episodes: totalEpisodes,
          popular:popularCount,
          users: userCount,
          messages: messageCount,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <img className="logo" src="/logo2.gif" alt="Filmix Logo" style={{ width: "250px", height: "75px" }} />
        <Link to="/home"><h3>Home</h3></Link>
        <Link to="/movies"><h3>Movies</h3></Link>
        <Link to="/series"><h3>Series</h3></Link>
        <Link to="/popular"><h3>Popular</h3></Link>
        <div className="buttons">
          <Link to="/login"><button className="btn btn-danger">Logout</button></Link>
        </div>
      </div>

      {/* Sidebar and Dashboard Flex Layout */}
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="sidebar"> 
          <div className="links">
            <Link to="/addmovie" style={{ textDecoration: "none", color: "black" }}><h3><RiMovie2Fill style={{ color: 'rgb(12, 12, 12)', marginBottom: "6px" }} /> Add Movies</h3></Link>
            <Link to="/addserie" style={{ textDecoration: "none", color: "black" }}><h3><BiSolidMoviePlay style={{ color: 'rgb(12, 12, 12)', marginBottom: "6px" }} />Add Series</h3></Link>
            <Link to="/addseriesepisode" style={{ textDecoration: "none", color: "black" }}><h3><PiFilmSlateFill style={{ color: 'rgb(12, 12, 12)', marginBottom: "6px" }} />Add  Episodes</h3></Link>
            <Link to="/addpopular" style={{ textDecoration: "none", color: "black" }}><h3><FaMoneyBillTrendUp style={{ color: 'rgb(12, 12, 12)', marginBottom: "15px" }} />Add Popular</h3></Link>
            <Link to="/userinfo" style={{ textDecoration: "none", color: "black" }}><h3><FaUsers style={{ color: 'rgb(12, 12, 12)', marginBottom: "6px" }} /> Users</h3></Link>
            <Link to="/messages" style={{ textDecoration: "none", color: "black" }}><h3><TbMessages style={{ color: 'rgb(12, 12, 12)', marginBottom: "6px" }} /> Messages</h3></Link>
          </div>
        </div>

        {/* Dashboard Area (Flex next to sidebar) */}
        <div className="dashboard" style={{marginLeft:"320px"}}>
          <Container>
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <Row>
              {/* Movies Count */}
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <RiMovie2Fill size={40} color="#007bff" />
                    <h4 className="mt-2">Movies</h4>
                    <p>{dashboardData.movies}</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Series Count */}
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <BiSolidMoviePlay size={40} color="#28a745" />
                    <h4 className="mt-2">Series</h4>
                    <p>{dashboardData.series}</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Episodes Count */}
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <PiFilmSlateFill size={40} color="#dc3545" />
                    <h4 className="mt-2">Episodes</h4>
                    <p>{dashboardData.episodes}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
                 {/* Popular Count */}
                 <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <FaMoneyBillTrendUp size={40} color="purple" />
                    <h4 className="mt-2">Popular Movie && Series</h4>
                    <p>{dashboardData.popular}</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Users Count */}
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <FaUsers size={40} color="#ffc107" />
                    <h4 className="mt-2">Users</h4>
                    <p>{dashboardData.users}</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Messages Count */}
              <Col md={4}>
                <Card className="text-center mb-4">
                  <Card.Body>
                    <TbMessages size={40} color="#17a2b8" />
                    <h4 className="mt-2">Messages</h4>
                    <p>{dashboardData.messages}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
