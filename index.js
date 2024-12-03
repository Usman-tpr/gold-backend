const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error while connecting to database", err);
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS
app.use(cors({
    origin: ['http://localhost:3000' , 'http://46.202.162.48/*' , ],  // Remove the trailing slash
    credentials: true,  // Allow cookies and other credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Include OPTIONS method
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow necessary headers
}));



// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const dealRoutes = require("./routes/dealRoutes")
const categoryRoutes = require("./routes/CategoryRoutes")
const SubCategoryRoutes = require("./routes/SubCategory")
// Parse JSON requests
app.use(express.json());

// Define routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/deal", dealRoutes);
app.use("/category", categoryRoutes);
app.use("/subCategory", SubCategoryRoutes);

// Start the server
const port = process.env.PORT || 5000;  // Use the port from environment variable or default to 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
