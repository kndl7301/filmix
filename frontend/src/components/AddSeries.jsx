import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminPage.css';
import axios from 'axios';

function AddSeries() {
    const [series, setSeries] = useState({
        id: '',
        title: '',
        rating: '',
        poster: '',
        release_year: '',
        episodes: []
    });
    
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeries({
            ...series,
            [name]: name === "id" ? parseInt(value) || '' : name === "rating" ? parseFloat(value) || '' : value
        });
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending series data:", series);
    
        try {
            const response = await axios.post('https://filmix-dfzo.onrender.com/api/series', series);
            console.log("Response from server:", response.data);
            alert('Series added successfully!');
            setSeries({ id: '', title: '', rating: '', poster: '', release_year: '', episodes: [] });
        } catch (error) {
            console.error('Error adding series:', error.response?.data || error.message);
            alert('Failed to add series');
        }
    };
    
    return (
        <div className="admin-wrapper container mt-4">
            <div className="navbar d-flex justify-content-between align-items-center p-3 bg-dark text-white">
                <img className='logo' src="/logo2.gif" alt="Filmix Logo" style={{ width: "250px", height: "75px" }} />
                <div>
                    <Link className="text-white mx-2" to="/home">Home</Link>
                    <Link className="text-white mx-2" to="/movies">Movies</Link>
                    <Link className="text-white mx-2" to="/series">Series</Link>
                    <Link className="text-white mx-2" to="/popular">Popular</Link>
                    <Link className="text-white mx-2" to="/adminpage">Admin Page</Link>
                </div>
                <Link to="/login"> <button className='btn btn-danger'>Logout</button></Link>
            </div>
            
            <div className="card mt-4 p-4">
                <h2 className="mb-3">Add New Series</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input type="number" className="form-control" name="id" value={series.id} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={series.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input type="number" step="0.1" className="form-control" name="rating" value={series.rating} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Poster URL</label>
                        <input type="text" className="form-control" name="poster" value={series.poster} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Release Year</label>
                        <input type="number" className="form-control" name="release_year" value={series.release_year} onChange={handleChange} required />
                    </div>
                    <hr />
                
                    <button type="submit" className="btn btn-primary mt-3">Add Series</button>
                </form>
            </div>
        </div>
    );
}

export default AddSeries;
