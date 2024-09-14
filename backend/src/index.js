const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');


dotenv.config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Add this line below app.use(cors()) in src/index.js
const apiRoutes = require('./routes');
app.use(apiRoutes);

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // setting up firestore

// Basic route to check if server is working
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

