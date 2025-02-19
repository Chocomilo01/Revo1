require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/route'); // Import routes
const app = express();
const adminRoutes = require('./routes/adminRoutes');

// Middleware for parsing JSON
app.use(express.json());
app.use(cors()); // Enable CORS
app.use('/api/admin', adminRoutes);
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected successfully'))
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the app if the database connection fails
    });

// API Routes
app.use('/api', productRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Product API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
