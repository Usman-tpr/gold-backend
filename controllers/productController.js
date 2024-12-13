const Product = require('../models/ProductModel');
const Deal = require('../models/DealsModel');
const Cart = require("../models/cartModel");
const {uploadImagesToCloudinary} = require("../utills/cloudinary")
const { default: mongoose } = require('mongoose');


const postProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({
                success: false,
                message: "No images provided.",
            });
        }

        const uploadedImages = await uploadImagesToCloudinary(req.files);
        const newProduct = new Product({
            title: req.body.title,
            desc: req.body.description,
            location: req.body.location,
            condition: req.body.condition,
            weight:req.body.weight,
            images: uploadedImages,
            price: req.body.price,
            userId: req.user.userId,
            category: req.body.category,
            subCategory: req.body.subCategory,
            type:req.body.type,
            metalType:req.body.metal,
            karatage:req.body.karat,
            sellingType:req.body.sellingType,
            rent:false
        });

        await newProduct.save();

        res.status(201).send({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error while uploading product:", error);
        res.status(500).send({
            success: false,
            message: "Error while uploading product",
            error: error.message,
        });
    }
};
const AddOnRent = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send({
                success: false,
                message: "No images provided.",
            });
        }

        const uploadedImages = await uploadImagesToCloudinary(req.files);
        const newProduct = new Product({
            title: req.body.title,
            desc: req.body.description,
            location: req.body.location,
            condition: req.body.condition,
            weight:req.body.weight,
            images: uploadedImages,
            price: req.body.price,
            userId: req.user.userId,
            category: req.body.category,
            subCategory: req.body.subCategory,
            type:req.body.type,
            metalType:req.body.metal,
            karatage:req.body.karat,
            sellingType:req.body.sellingType,
            rent:true
        });

        await newProduct.save();

        res.status(201).send({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error while uploading product:", error);
        res.status(500).send({
            success: false,
            message: "Error while uploading product",
            error: error.message,
        });
    }
};
// GET: Get All Products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      success: true,
      message: 'All Products Retrieved => workig properly',
      body: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error While Getting Products',
    });
  }
};

// GET: Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Product Retrieved',
      body: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error While Getting Product',
    });
  }
};

// GET: Get Products by Token (User's Products)
const getProductsByToken = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.userId }).sort({createdAt:-1})
    res.status(200).json({
      success: true,
      message: 'Retrieved Products By User',
      body: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error while getting products: ${error}`,
    });
  }
};

// DELETE: Delete Product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error while deleting product',
      error: error.message,
    });
  }
};

// GET: Search Products by Query
const searchProducts = async (req, res) => {
  const searchQuery = req.query.q;
  try {
    let products;

    if (!searchQuery) {
      // No search query, retrieve all products
      products = await Product.find({});
    } else {
      // Search with query using regex on category and subCategory fields
      const regex = new RegExp(searchQuery, 'i');
      products = await Product.find(
          { category: { $regex: regex } }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Products Retrieved',
      body: products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error, please try again.' });
  }
};

// POST: Deal Details
const dealDetails = async (req, res) => {
  try {
    const deal = new Deal({
      buyerId: req.user.userId,
      sellerId: req.body.sellerId,
      productId: req.body.productId,
    });

    await deal.save();

    res.status(200).json({
      success: true,
      message: 'Deal added successfully',
      deal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
};

// POST: Get Products by Category
const getByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.body.category });

    res.status(200).json({
      success: true,
      message: 'Products Retrieved by Category',
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
};

// POST: Get Products by SubCategory
const getBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({ subCategory: req.body.subCategory });

    res.status(200).json({
      success: true,
      message: 'Products Retrieved by SubCategory',
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
};


// POST: Get Products by SubCategory


const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate Product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    // Check if the product exists
    const isExistProduct = await Product.findById(productId);
    if (!isExistProduct) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    // Check if the product is already in the cart
    // const isAlreadyInCart = await Cart.findOne({ productId, userId: req.user.userId });

    // if (isAlreadyInCart) {
    //   // Delete the product from the cart if it already exists
    //   const deletedFromCart = await Cart.findByIdAndDelete(isAlreadyInCart._id);
    //   return res.status(200).json({ 
    //     success: true, 
    //     message: "Deleted From Cart", 
    //     body: deletedFromCart 
    //   });
    // }

    // Add the product to the cart
    const newCart = new Cart({
      ...req.body,
      userId: req.user.userId
    });
    await newCart.save();

    res.status(200).json({
      success: true,
      message: "Added To Cart",
      cart: newCart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const getMyCarts = async (req, res) => {
    try {
      const products = await Cart.find({ userId:req.user.userId}).populate("productId")
  
      res.status(200).json({
        success: true,
        message: 'Carts retrieved',
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error: ${error}`,
      });
    }
  };
  const updateProduct = async (req, res) => {
    try {
      const { id } = req.params; // Get product ID from params
      const updates = req.body;  // Get updated fields from request body
  
      // Use $set to update only the changed fields
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updates },  // Only set fields passed in req.body
        { new: true, runValidators: true } // Return updated product & validate input
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
     res.send({
        success:true,
        mesage:"Product Updated Succesfully"
     })
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  };

  const getHomePageProducts = async (req, res) => {
    try {
      const products = await Product.aggregate([
        // 1. Sort by createdAt in descending order (latest first)
        { $sort: { createdAt: -1 } },
  
        // 2. Group by category and push products into an array
        {
          $group: {
            _id: '$category', // Group by category field
            latestProducts: { $push: '$$ROOT' }, // Add entire product to array
          },
        },
  
        // 3. Limit each category to the top 5 products
        {
          $project: {
            _id: 0, // Exclude _id from the result
            category: '$_id', // Rename _id to category
            products: { $slice: ['$latestProducts', 5] }, // Keep only top 5 products
          },
        },
      ]);
  
      res.send({
        success:true,
        message:"Retreived successfully",
        body:products
      })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  };
  
  const getProductsBySlug = async ( req , res ) =>{
    try {

        const slug = req.params.slug
        const products = await Product.find({
            slug:slug
        }).populate("userId")

        const relatedProducts = await Product.find({
              category:products.category
        })

        res.send({
            success:true,
            message:"retrived Successfully",
            body:products,
            relatedProducts:relatedProducts
        })
    } catch (error) {
        res.send({
            success:false,
            message:"error while getting" + error,
            body:null
        })
    }
  }

  const getFullSet = async ( req , res ) =>{
    try {
    
        const products = await Product.find({
            sellingType:"F"
        }).populate("userId")


        res.send({
            success:true,
            message:"retrived Success",
            body:products
        })
    } catch (error) {
        res.send({
            success:false,
            message:"error while getting" + error,
            body:null
        })
    }
  }

module.exports = {
    addToCart,
    getMyCarts,
  postProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByToken,
  searchProducts,
  dealDetails,
  getByCategory,
  getBySubCategory,
  updateProduct,
  getHomePageProducts,
  getProductsBySlug,
  getFullSet,
  AddOnRent
};
