const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require("mongoose");
require("dotenv").config();

// Custom CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://gold.ayancurtains.com");  // Adjust your frontend URL
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  
    // Handle pre-flight (OPTIONS) requests
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);  // Respond to OPTIONS request with status 200
    }
  
    next();  // Continue to the next middleware/route handler
  });
  

// Connect to the database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error while connecting to database", err);
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.options('*', cors());





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
const port = process.env.PORT || 8000;  // Use the port from environment variable or default to 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
