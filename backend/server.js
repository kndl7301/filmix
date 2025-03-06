const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI; // Get MongoDB URI from .env

const client = new MongoClient(uri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests from your frontend URL
const corsOptions = {
  origin: ['https://filmix-1.onrender.com', 'http://localhost:5173','http://localhost:5174'], // Allow only this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allow cookies (if needed)
};

app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options('*', cors(corsOptions)); 


let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("filmix");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("Filmix Backend is Running");
});


// **LOGIN API**
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email ve şifre gereklidir" });
    }

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Hatalı şifre" });
    }

    res.json({
      message: "Giriş başarılı",
      token: "fake-jwt-token",
      user: { userName: user.userName, email: user.email, gsm: user.gsm }
    });

  } catch (error) {
    console.error("Login API hatası:", error);
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

// **SIGN UP API**
app.post('/api/signup', async (req, res) => {
  try {
    const { userName, gsm, email, password } = req.body;

    if (!userName || !gsm || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { userName, gsm, email, password };

    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: "User created successfully", token: "fake-jwt-token" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **USERS API**
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json(users);
  } catch (err) {
    console.error("Veritabanından veri çekme hatası", err);
    res.status(500).send("Veritabanından veri çekme hatası");
  }
});

// **USERS API by ID**
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.collection('users').findOne({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json(user);
  } catch (err) {
    console.error("Veritabanından veri çekme hatası", err);
    res.status(500).send("Veritabanından veri çekme hatası");
  }
});

//DELETE USER
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Convert `id` to a number and query the `id` field (not MongoDB's `_id`)
    const result = await db.collection("users").deleteOne({ id: Number(id) }); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});


// **SERIES API**
app.get('/api/series', async (req, res) => {
  try {
    const series = await db.collection('series').find({}).sort({ rating: -1 }).toArray();

    if (series.length === 0) {
      return res.status(404).json({ message: "Dizi bulunamadı" });
    }

    res.json(series);
  } catch (err) {
    console.error("Veritabanından veri çekerken hata:", err);
    res.status(500).send('Veritabanından veri çekme hatası');
  }
});

// **SERIES BY ID API (FIXED)**
app.get("/api/series/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Fetching series with ID:", id);

    // Find the series by ID
    const series = await db.collection('series').findOne({ id: parseInt(id) });

    if (!series) {
      console.log("Series not found for ID:", id);
      return res.status(404).json({ message: "Series not found" });
    }

    // Sort episodes by episode_id in ascending order
    if (series.episodes && Array.isArray(series.episodes)) {
      series.episodes.sort((a, b) => a.episode_id - b.episode_id);
    }

    res.json(series);
  } catch (error) {
    console.error("Error fetching series:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// **FILMS API**
app.get('/api/films', async (req, res) => {
  try {
    const films = await db.collection('films').find({}).sort({ rating: -1 }).toArray();

    if (films.length === 0) {
      return res.status(404).json({ message: "Film bulunamadı" });
    }

    res.json(films);

  } catch (err) {
    console.error("Veritabanından veri çekme hatası", err);
    res.status(500).send('Veritabanından veri çekme hatası');
  }
});

// **POPULAR API**
app.get('/api/popular', async (req, res) => {
  try {
    const popular = await db.collection('popular').find({}).sort({ rating: -1 }).toArray();

    if (popular.length === 0) {
      return res.status(404).json({ message: "Popüler filmler bulunamadı" });
    }

    res.json(popular);

  } catch (err) {
    console.error("Veritabanından veri çekme hatası", err);
    res.status(500).send("Veritabanından veri çekme hatası");
  }
});


// **ADD MOVIE API**
app.post('/api/films', async (req, res) => {
  try {
      console.log("Received movie data:", req.body); // Debugging

      const { id, title, rating, poster, release_year, film_duration } = req.body;

      if (!id || !title || !rating || !poster || !release_year || !film_duration) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newMovie = { id, title, rating, poster, release_year, film_duration };
      await db.collection('films').insertOne(newMovie);

      res.status(201).json({ message: "Movie added successfully" });

  } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// **ADD SERİE API**
app.post('/api/series', async (req, res) => {
  try {
      console.log("Received series data:", req.body);

      const { id, title, rating, poster, release_year, episodes } = req.body;

      if (!id || !title || !rating || !poster || !release_year || !Array.isArray(episodes)) {
          return res.status(400).json({ message: "All fields are required, and episodes must be an array" });
      }

      const newSeries = { id, title, rating, poster, release_year, episodes };
      await db.collection('series').insertOne(newSeries);

      res.status(201).json({ message: "Series added successfully" });

  } catch (error) {
      console.error("Error adding series:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// **ADD EPISODE TO SERIES API**
app.post('/api/series/:id/episodes', async (req, res) => {
  try {
      const { id } = req.params; // Get series ID from URL
      const { episode_id, title, duration, release_date, episode_season } = req.body;

      if (!episode_id || !title || !duration || !release_date || !episode_season) {
          return res.status(400).json({ message: "All fields are required for the episode" });
      }

      // Find the series by ID
      const series = await db.collection('series').findOne({ id: parseInt(id) });

      if (!series) {
          return res.status(404).json({ message: "Series not found" });
      }

      // Add the new episode to the series' episodes array
      const newEpisode = { episode_id, title, duration, release_date, episode_season };
      await db.collection('series').updateOne(
          { id: parseInt(id) },
          { $push: { episodes: newEpisode } }
      );

      res.status(201).json({ message: "Episode added successfully", episode: newEpisode });
  } catch (error) {
      console.error("Error adding episode:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/api/series', async (req, res) => {
  try {
    const series = await db.collection('series').find().toArray();
    // Optionally map the _id to id for frontend consistency
    const formattedSeries = series.map(s => ({ ...s, id: s._id.toString() }));
    res.json(formattedSeries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching series" });
  }
});


// **ADD popular API**
app.post('/api/popular', async (req, res) => {
  try {
      console.log("Received popular data:", req.body); // Debugging

      const { id, title, rating, poster, release_year } = req.body;

      if (!id || !title || !rating || !poster || !release_year ) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newMovie = { id, title, rating, poster, release_year };
      await db.collection('popular').insertOne(newMovie);

      res.status(201).json({ message: "Movie added successfully" });

  } catch (error) {
      console.error("Error adding movie:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});







// API endpoint to save messages
app.post("/api/messages", async (req, res) => {
  try {
    // Debugging to check the received request body
    console.log("Received message data:", req.body);

    const { name,email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email ||  !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the message to the 'messages' collection
    const newMessage = {name, email, message };
    await db.collection('messages').insertOne(newMessage);

    // Send a success response
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    // Handle any errors
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// **Messages API**
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await db.collection('messages').find().sort({ _id: -1 }) .toArray();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error); // Log the error
    res.status(500).json({ message: "Server error while fetching messages" });
  }
});




// **SERVER START**
app.listen(port, () => {
  console.log(`Server https://filmix-dfzo.onrender.com/:${port} üzerinde çalışıyor`);
});



