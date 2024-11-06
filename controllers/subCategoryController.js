const SubCategory = require("../models/SubCategoryModel")
const { uploadImageToCloudinary } = require("../utills/cloudinary");

const add = async( req , res ) => {
    try {
        const imageUrl = uploadImageToCloudinary(req.file)

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

module.exports = { add , getAll }