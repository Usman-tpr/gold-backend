const Category = require("../models/CategoryModel");
const { uploadImageToCloudinary } = require("../utills/cloudinary");

const add = async( req , res ) => {
    try {
        let imageUrl;
        
        if(req.file){
             imageUrl = await uploadImageToCloudinary(req.file)
        }

        const data = {
            name:req.body.name,
            image:imageUrl || ""
        }

        const newCategory = new Category(data)
        await newCategory.save()

        res.status(201).send({
            success: true ,
            message:"Category Added Successfully",
            data:newCategory
        })
    } catch (error) {
        res.status(201).send({
            success: false,
            message:"Error While Creating Category" + error,
            data:null
        })
    }
}

const getAll = async ( req , res ) =>{
    try {
        const allCategories = await Category.find();

        res.status(201).send({
            success:true,
            message:"Get All Categories",
            body:allCategories
        })
    } catch (error) {
        res.status(201).send({
            success:false,
            message:"Error While Getting Categoires" + error,
            body:null
        })
    }
}
const trendingCategory = async ( req , res ) =>{
    try {
        const allCategories = await Category.find().limit(5);

        res.status(201).send({
            success:true,
            message:"Get All Categories",
            body:allCategories
        })
    } catch (error) {
        res.status(201).send({
            success:false,
            message:"Error While Getting Categoires" + error,
            body:null
        })
    }
}
const getDropdownProducts = async ( req , res ) =>{
    try {
    
        const query = req.query.q;
 
        const categories = await Category.find({
          name : { $regex : query , $options:"i"}
        }).limit(5)


        res.send({
            success:true,
            message:"retrived dropdown items Successfully for "+query,
            body:categories
        })
    } catch (error) {
        res.send({
            success:false,
            message:"error while getting" + error,
            body:null
        })
    }
  }

module.exports = { add , getAll , getDropdownProducts , trendingCategory }