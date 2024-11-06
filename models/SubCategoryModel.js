const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"GoldCategory"
    },
    image:{
     type:String
    }
}, {timestamps:true})

module.exports = mongoose.model("GoldSubCategory", subCategorySchema)