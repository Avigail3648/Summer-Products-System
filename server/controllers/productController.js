const Product = require("../models/Product")

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }
    res.json(products)
}

const createNewProduct = async (req, res) => {
    const { productname, color, modele, price, forage, size, sizeType, picture } = req.body

    if (!productname || !color || !modele || !price || !forage || !picture) {
        return res.status(400).json({ message: 'productname,color,modele,price,forage,picture are required' })
    }
    const duplicateProduct = await Product.findOne({ modele: modele }).lean()
    if (duplicateProduct) {
        return res.status(409).json({ message: "Duplicate Product" })
    }
    const product = await Product.create({ productname, color, modele, price, forage, size, sizeType, picture })
    if (product) {
        return res.status(201).json({ message: 'New product created', product })
    }
    else {
        return res.status(400).json({ message: 'Invalid product' })
    }
}

const updateProduct = async (req, res) => {
    const { id, productname, color, modele, price, forage, size, sizeType, picture } = req.body
    if (!id || !productname || !color || !modele || !price || !forage || !picture) {
        return res.status(400).json({ message: '_id,productname,color,modele,price,forage,picture are required' })
    }
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'No products found' })
    }
    product.productname = productname
    product.color = color
    product.modele = modele
    product.price = price
    product.forage = forage
    product.size = size
    product.sizeType = sizeType
    product.picture = picture

    const updateProduct = await product.save()
    res.json({ message: 'product update', updateProduct })
}

const deleteProduct = async (req, res) => {
    const { id } = req.body
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'product Not  found' })
    }
    await product.deleteOne()
    const reply = `product '${product.productname}' ID ${product._id} deleted`
    res.json(reply)
}

const getProductById = async (req, res) => {
    const { id } = req.body

    const product = await Product.findById(id).lean()
    if (!product) {
        return res.status(400).json({ message: 'product Not  found' })
    }
    res.json(product)
}

module.exports = { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProductById }