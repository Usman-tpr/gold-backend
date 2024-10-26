const routes = require("express").Router();
const { 
    postProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    searchProducts, 
    getBySubCategory, 
    getProductsByToken,
    getByCategory 
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');

// Setup Multer for file handling
const upload = require("../config/multer")

// Routes
routes.post('/add', authMiddleware, upload.array('images', 10), postProduct); // Limit to 10 images
routes.delete('/delete/:id', deleteProduct);
routes.get("/all-products", getAllProducts);
routes.get("/single-product/:id", getProductById);
routes.get("/my-products", authMiddleware, getProductsByToken);
routes.get('/search', searchProducts);
routes.post('/category', getByCategory);
routes.post('/subcategory', getBySubCategory);

module.exports = routes;
