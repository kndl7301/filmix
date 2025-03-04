import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AdminPage.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("https://filmix-dfzo.onrender.com/api/messages");
      console.log("Gelen veriler:", response.data);
      setMessages(response.data); // ✅ Corrected setter
    } catch (error) {
      console.error("Mesajlar yüklenirken hata oluştu:", error.message);
    }
  };

  return (
    <div className="admin-wrapper container mt-4">
      <div className="navbar d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <img
          className="logo"
          src="/logo2.gif"
          alt="Filmix Logo"
          style={{ width: "250px", height: "75px" }}
        />
        <div>
          <Link className="text-white mx-2" to="/home">
            Home
          </Link>
          <Link className="text-white mx-2" to="/movies">
            Movies
          </Link>
          <Link className="text-white mx-2" to="/series">
            Series
          </Link>
          <Link className="text-white mx-2" to="/popular">
            Popular
          </Link>
          <Link className="text-white mx-2" to="/adminpage">
            Admin Page
          </Link>
        </div>
        <Link to="/login">
          <button type="button" className="btn btn-danger">Logout</button>
        </Link>
      </div>

      <Container className="mt-4">
        <h2 className="mb-3 text-center">User Messages</h2>
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message) => (
                <tr key={message._id}>
                  <td>{message.name}</td>
                  <td>{message.email}</td> {/* ✅ Changed from `name` to `gsm` as per backend */}
                  <td>{message.message}</td> {/* ✅ Corrected `user.message` to `message.message` */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Mesaj bulunamadı</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Messages;
