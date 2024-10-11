const routes = require("express").Router();
const { postProduct , deleteProduct , getAllProducts , getProductById  ,  searchProducts , getBySubCategory, getByCategory} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware")

const multer =require("multer")
const  path  = require("path")
const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        cb(null , 'uploads/images')
    } , 
    filename : (req , file , cb) => {
        cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

routes.post('/add' , authMiddleware , upload.array('images' , 10) , postProduct)
routes.delete('/delete/:id' ,  deleteProduct)
routes.get("/all-products" , getAllProducts)
routes.get("/single-product/:id" , getProductById)
routes.get("/product/:id" , getProductById)
routes.get("/my-products" ,authMiddleware, getProductsByToken)
routes.get('/search', searchProducts);
routes.post('/category',getByCategory );
routes.post('/subcategory',getBySubCategory );

module.exports = routes