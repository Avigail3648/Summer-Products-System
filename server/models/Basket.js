const mongoose = require("mongoose")
const Schema = mongoose.Schema

const basketSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
}, { timestamps: true })

module.exports = mongoose.model('Basket', basketSchema)