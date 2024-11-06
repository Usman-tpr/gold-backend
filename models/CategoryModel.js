const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    image:{
     type:String
    }
}, {timestamps:true})

module.exports = mongoose.model("GoldCategory", categorySchema)