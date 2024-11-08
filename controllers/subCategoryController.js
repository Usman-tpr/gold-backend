const { isValidObjectId } = require("mongoose");
const CategoryModel = require("../models/CategoryModel");
const SubCategory = require("../models/SubCategoryModel")
const { uploadImageToCloudinary } = require("../utills/cloudinary");

const add = async( req , res ) => {
    try {

        let imageUrl;
        if(req.file){
             imageUrl = uploadImageToCloudinary(req.file)
        }

        const data = {
            name:req.body.name,
            categoryId:req.body.categoryId,
            image:imageUrl || ""
        }

        const newSubCategory = new SubCategory(data)
        await newSubCategory.save()

        res.status(201).send({
            success: true ,
            message:"SubCategory Added Successfully",
            data:newSubCategory
        })
    } catch (error) {
        res.status(201).send({
            success: false,
            message:"Error While Creating SubCategory" + error,
            data:null
        })
    }
}

const getAll = async ( req , res ) =>{
    try {
        const allSubCategories = await SubCategory.find();
        res.status(201).send({
            success:true,
            message:"Get All SubCategories",
            body:allSubCategories
        })
    } catch (error) {
        res.status(201).send({
            success:false,
            message:"Error While Getting SubCategoires" + error,
            body:null
        })
    }
}

const getById = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ name: req.params.name });

        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
                body: null
            });
        }

        const subcategories = await SubCategory.find({ categoryId: category._id });
        
        res.status(200).send({
            success: true,
            message: "Get All SubCategories",
            body: subcategories
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error While Getting SubCategories: " + error.message,
            body: null
        });
    }
};


module.exports = { add , getAll , getById }