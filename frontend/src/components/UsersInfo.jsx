import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AdminPage.css";

const UsersInfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://filmix-dfzo.onrender.com/api/users");
      console.log("Gelen veriler:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata oluştu:", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://filmix-dfzo.onrender.com/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // ✅ Fixed here
      alert("User has been deleted");
      console.log("User has been deleted:", id);
    } catch (error) {
      console.error("Kullanıcı silinirken hata oluştu:", error.message);
    }
  };

  return (
    <div className="admin-wrapper container mt-4">
      <div className="navbar d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <img className="logo" src="/logo2.gif" alt="Filmix Logo" style={{ width: "250px", height: "75px" }} />
        <div>
          <Link className="text-white mx-2" to="/home">Home</Link>
          <Link className="text-white mx-2" to="/movies">Movies</Link>
          <Link className="text-white mx-2" to="/series">Series</Link>
          <Link className="text-white mx-2" to="/popular">Popular</Link>
          <Link className="text-white mx-2" to="/adminpage">Admin Page</Link>
        </div>
        <Link to="/login">
          <button type="button" className="btn btn-danger">Logout</button> {/* ✅ Added type="button" */}
        </Link>
      </div>

      <Container className="mt-4">
        <h2 className="mb-3 text-center">User List</h2>
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Kullanıcı Adı</th>
              <th>Email</th>
              <th>Gsm</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.gsm || "Bilinmiyor"}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Sil</Button> {/* ✅ Fixed */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Kullanıcı bulunamadı</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UsersInfo;
