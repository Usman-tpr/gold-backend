const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
    seller:{
        type:Object,
        default:{}
    },
    buyer:{
        type:Object,
        default:{}
    },
    timestamp: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model("Deal" , dealSchema)