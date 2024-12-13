const mongoose = require("mongoose");
const slugify = require('slugify');

const productSchema = mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: String
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String
    },
    weight: {
        type: String
    },
    condition: {
        type: String
    },
    slug: {
        type: String,
        unique: true
    },
    type:{
        type:String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GoldUser"
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    metalType: {
        type: String
    },
    karatage: {
        type: String
    },
    sellingType: {
        type: String
    },
    rent: {
        type: Boolean
    },
    
},
    { timestamps: true } 

)

productSchema.pre('save', function (next) {
    if (this.isModified('title')) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });

module.exports = mongoose.model("GoldProduct", productSchema)