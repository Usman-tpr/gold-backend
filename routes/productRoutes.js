const routes = require("express").Router();
const { 
    postProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    searchProducts, 
    getBySubCategory, 
    getProductsByToken,
    addToCart,
    updateProduct,
    getHomePageProducts,
    getMyCarts,
    getByCategory ,
    getProductsBySlug
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

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
routes.post('/add-to-cart',authMiddleware, addToCart);
routes.get('/get-my-carts',authMiddleware, getMyCarts);
routes.put('/update/:id',authMiddleware, updateProduct);
routes.get('/get-homepage-products' , getHomePageProducts)
routes.get('/:slug' , getProductsBySlug)

module.exports = routes;
