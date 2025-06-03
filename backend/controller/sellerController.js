const Product = require("../models/Product")
const mongoose = require('mongoose');

const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find().populate('seller',
            'name email profileImageUrl'
        )
        res.json(product);
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

const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            specs,
            category,
            stock,
        } = req.body

        const images = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : [];

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const product = await Product.create({
            seller: req.user.id,
            name,
            price,
            images,
            description,
            specs,
            category,
            stock,
        });
        res.status(201).json({ message: "Product Created Successfully", product })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
       const newImages = req.files ? req.files.map(file => `/uploads/products/${file.filename}`) : product.images;
        product.images = newImages;
        product.description = req.body.description || product.description;
        product.specs = req.body.specs || product.specs;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;
        const updatedProduct = await product.save();
        res.json({ message: "Product updated successfully", updatedProduct })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" })
        await product.deleteOne()
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const getDashboard = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const totalProduct = await Product.countDocuments({ seller: sellerId });

        const sellerProducts = await Product.find({ seller: sellerId })
            .populate('ratings.user', 'name profileImageUrl');

        const allCategories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Beauty', 'Home Appliances', 'Toys', 'Sports', 'Other'];

        const categoryCounts = await Product.aggregate([
            {
                $match: {
                    seller: new mongoose.Types.ObjectId(sellerId)
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        const countsMap = {};
        categoryCounts.forEach(cat => {
            countsMap[cat.category] = cat.count;
        });

        const categoryProductCount = allCategories.map(cat => ({
            category: cat,
            count: countsMap[cat] || 0
        }));

        res.status(200).json({
            totalProduct,
            sellerProducts,
            categoryProductCount
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getDashboard,
}; 