import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddSeriesEpisode() {
    const navigate = useNavigate();
    const [seriesList, setSeriesList] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState('');
    const [episode, setEpisode] = useState({
        episode_id: '',
        title: '',
        duration: '',
        release_date: '',
        episode_season: ''
    });

    // Fetch series list when component mounts
    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/series');
                setSeriesList(response.data);
            } catch (error) {
                console.error('Error fetching series list:', error);
            }
        };
        fetchSeries();
    }, []);

    const handleSeriesChange = (e) => {
        setSelectedSeries(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEpisode({
            ...episode,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSeries) {
            alert('Please select a series!');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/series/${selectedSeries}/episodes`, episode);
            console.log("Episode added:", response.data);
            alert('Episode added successfully!');
            navigate(`/series/${selectedSeries}`); // Navigate to the series details page
        } catch (error) {
            console.error('Error adding episode:', error.response?.data || error.message);
            alert('Failed to add episode');
        }
    };

    return (
        <div className="container mt-4">
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
            <h2>Add New Episode to Series</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select Series</label>
                    <select className="form-control" value={selectedSeries} onChange={handleSeriesChange} required>
                        <option value="">-- Select a Series --</option>
                        {seriesList.map((series) => (
                            <option key={series.id} value={series.id}>
                                {series.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Episode ID</label>
                    <input type="number" className="form-control" name="episode_id" value={episode.episode_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={episode.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input type="text" className="form-control" name="duration" value={episode.duration} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Release Date</label>
                    <input type="date" className="form-control" name="release_date" value={episode.release_date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Season and Episode</label>
                    <input type="text" className="form-control" name="episode_season" value={episode.episode_season} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Episode</button>
            </form>
        </div>
    );
}

export default AddSeriesEpisode;
