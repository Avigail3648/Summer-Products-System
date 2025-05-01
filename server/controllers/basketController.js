const Basket = require("../models/Basket")
const Product = require("../models/Product")

const getAllBaskets = async (req, res) => {
    const baskets = await Basket.find({ userid: req.user._id }).lean()
    if (!baskets?.length) {
        return res.status(400).json({ message: 'No baskets fount' })
    }
    const arrIdsproducts = baskets.map((basket) => {
        return basket.productid;
    })
    let productss = [];
    await Promise.all(arrIdsproducts.map(async (currentId) => {
        const product = await Product.findById(currentId);
        if (product)
            productss.push(product);
    }));

    res.json(productss);
}

const createNewBasket = async (req, res) => {
    const { productid } = req.body

    if (!productid) {
        return res.status(400).json({ message: 'productid is required' })
    }
    const newBasket = await Basket.create({ userid: req.user._id, productid })
    if (newBasket) {
        return res.status(201).json({ message: 'New basket created', newBasket })
    }
    else {
        return res.status(400).json({ message: 'Invalid basket' })
    }
}

const updateBasket = async (req, res) => {
    const { id, userid, productid } = req.body

    if (!id || !userid || !productid) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const basket = await Basket.findOne({ _id: id, userid: req.user._id }).exec()
    if (!basket) {
        return res.status(400).json({ messagei: 'basket not found' })
    }

    basket.userid = userid
    basket.productid = productid
    const updatedBasket = await basket.save()
    res.json('the basket updated', updatedBasket)
}

const deleteBasket = async (req, res) => {
    const { id } = req.body
    const basket = await Basket.findOne({ productid: id }).exec()

    if (!basket) {
        return res.status(400).json({ message: 'Basket not  fount' })
    }

    const result = await basket.deleteOne()
    const reply = `${result.userid} userid ,${result.productid} deleted`

    res.json(reply)
}

const getBasketById = async (req, res) => {
    const { id } = req.params
    const basket = await Basket.findOne({ _id: id, userid: req.user._id }).lean()

    if (!basket) {
        return res.status(400).json({ message: ' no basket found' })
    }
    res.json(basket)
}

module.exports = { createNewBasket, getAllBaskets, updateBasket, deleteBasket, getBasketById }