const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    price:{
        type:String
    },
    images: {
        type: [String],
        required: true
    },
    location:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GoldUser"
    },
    category:{
        type:String
    },
    subCategory:{
        type:String
    }
})

module.exports = mongoose.model("GoldProduct" , productSchema)