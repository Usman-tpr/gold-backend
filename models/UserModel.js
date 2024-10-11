const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String,
    },
    password:{
        type:String
    },
    location:{
        type:String,
        default: "Not specified"
    }
})

module.exports = mongoose.model("GoldUser" , userSchema)