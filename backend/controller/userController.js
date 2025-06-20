const User = require("../models/User");
const Product = require('../models/Product')

const getAllProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } }, 
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('seller', 'name email profileImageUrl')
            .populate('rating.user', 'name profileImageUrl');

        if (!product) return res.status(404).json({ message: "Product not found" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getProductSuggestions = async (req, res) => {
    try {
        const search = req.query.query || '';
        if (!search) return res.status(200).json([]);

        const suggestions = await Product.find({
            name: { $regex: search, $options: 'i' }
        }).select('name').limit(10);

        res.status(200).json(suggestions.map(product => product.name));
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { productId, quantity } = req.body;

        const productExists = user.cart.find(item => item.product.toString() === productId);
        if (productExists) {
            productExists.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('cart.product', 'name price images stock');

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getCartCount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const count = user.cart.length;
    res.status(200).json({ totalCartCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user._id);

        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();
        res.status(200).json({ message: 'Product removed', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getAllProduct,
    getProduct,
    getUserProfile,
    updateUserProfile,
    addToCart,
    getCart,
    removeFromCart,
    getProductSuggestions,
    getCartCount
};