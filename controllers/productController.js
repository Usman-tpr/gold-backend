const multer =require("multer")
const  path  = require("path")
const Product = require('../models/ProductModel')
const Deal = require("../models/DealsModel")
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


const postProduct = async ( req , res) =>{
    try {
        
        const imagePaths = req.files.map(file => file.path); 
        const newProduct = new Product({
            title: req.body.title,
            desc: req.body.description,
            location:req.body.location,
            images: imagePaths, 
            price: req.body.price,
            userId:req.user.userId,
            category:req.body.category,
            subCategory:req.body.subCategory
        });


        await newProduct.save();

        res.status(201).send({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error while uploading product:", error);
        res.status(500).send({
            success: false,
            message: "Error while uploading product",
            error: error.message
        });
    }

}

const getAllProducts = async ( req , res ) =>{
    try {
        const allProducts = await Product.find();
        res.status(201).send({
            success: true,
            message: "All Products Retrieved",
            body: allProducts
        });
    } catch (error) {
        res.status(201).send({
            success: false,
            message: "Error While Getting Products",
            body:null
        });
    }
}
const getProductById = async ( req , res ) =>{
    try {
        const allProducts = await Product.findById(req.params.id);
        res.status(201).send({
            success: true,
            message: "All Products Retrieved",
            body: allProducts
        });
    } catch (error) {
        res.status(201).send({
            success: false,
            message: "Error While Getting Products",
            body:null
        });
    }
}

getProductsByToken  = async ( req , res ) =>{
  try {
    const products = await Product.find({
        userId:req.user.userId
    })

    res.send({
        success:true,
        body:products,
        message:"Retrieved Products By One User"
    })
  } catch (error) {
    res.send({
        success:false,
        body:null,
        message:"error while getting products"+error
    })
  }
}

const deleteProduct = async ( req , res ) =>{
    try {
        const productId = req.params.id; 

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        console.error("Error while deleting product:", error);

        return res.status(500).json({
            success: false,
            message: "Error while deleting product",
            error: error.message
        });
    }

}

const searchProducts = async (req, res) => {
    const searchQuery = req.query.q;
  
    try {
      const products = await Product.find({
        title: { $regex: searchQuery, $options: 'i' } 
      });
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error, please try again.' });
    }
  };

  const dealDetails = async ( req , res ) =>{
    try {
        const deal = await new Deal({
            buyerId:req.user.userId,
            sellerId:req.sellerId,
            productId:req.productId
        })
        await deal.save();

        return res.status(200).json({
            success: true,
            message: "Added",
            deal: deal
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error"+error,
            product: null
        });
    }
  }

  const getByCategory = async ( req , res ) =>{
    try {
        const products = await Product.find({
            category:req.body.category
        })
  

        return res.status(200).json({
            success: true,
            message: "Added",
            deal: products
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error"+error,
            product: null
        });
    }
  }

  const getBySubCategory = async ( req , res ) =>{
    try {
        const products = await Product.find({
            subCategory:req.body.subCategory
        })
  

        return res.status(200).json({
            success: true,
            message: "Added",
            deal: products
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "error"+error,
            product: null
        });
    }
  }

module.exports ={
    postProduct , deleteProduct , getAllProducts , getProductById , getBySubCategory , searchProducts , dealDetails , getByCategory
}