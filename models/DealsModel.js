const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldUser"
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldUser"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldProduct"
    },
    isDealDone:{
        type:String,
        default:false
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("GoldDeal", dealSchema)