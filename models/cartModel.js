const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldUser"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldProduct"
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("GoldCart", dealSchema)