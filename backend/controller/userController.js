const Task = require("../models/Product");
const User = require("../models/User");
const Product = require('../models/Product')

const getAllProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments();

        const products = await Product.find()
            .populate('seller', 'name email profileImageUrl')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name email profileImageUrl')
            .populate('ratings.user', 'name profileImageUrl');

        if (!product) return res.status(404).json({ message: "Product not found" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}


module.exports = {getAllProduct, getProduct};