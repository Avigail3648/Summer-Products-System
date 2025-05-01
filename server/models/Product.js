const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    color: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    modele: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    forage: {
        type: [String],
        enum: ['babys', 'children', 'adults'],
        required: true,
    },
    size: {
        type: String
    },
    sizeType: {
        type: String
    },
    picture: {
        type: String, 
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)