const Product = require('../models/Product')
const User = require('../models/User')
const mongoose = require('mongoose')
const getAllSeller = async (req, res) => {
    try {
        const seller = await User.find({ role: "seller" })
        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}

const getSeller = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const seller = await User.findOne({ _id: req.params.id, role: "seller" });

        if (!seller) return res.status(404).json({ message: "Seller not found" });

        res.json(seller);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getSellerAllProducts = async (req, res) => {
    try {
        const sellerId = new mongoose.Types.ObjectId(req.user._id);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalSellerProduct = await Product.countDocuments({ seller: sellerId });

        const categorySellerCounts = await Product.aggregate([
            {
                $match: { seller: new mongoose.Types.ObjectId(sellerId) }
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

        const sellerCategories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Beauty', 'Home Appliances', 'Toys', 'Sports', 'Other'];

        const countsSellerMap = {};
        categorySellerCounts.forEach(cat => {
            countsSellerMap[cat.category] = cat.count;
        });

        const categorySellerProductCount = sellerCategories.map(cat => ({
            category: cat,
            count: countsSellerMap[cat] || 0
        }));

        const products = await Product.find({ seller: sellerId })
            .populate('seller', 'name email profileImageUrl')
            .populate('ratings.user', 'name profileImageUrl')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            totalPages: Math.ceil(totalSellerProduct / limit),
            totalSellerProduct,
            products,
            categorySellerProductCount,
            countsSellerMap,
            categorySellerCounts,
            sellerCategories
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getSellerproduct = async (req, res) => {
    try {
        const { sellerId, productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(sellerId)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const product = await Product.findOne({ _id: productId, seller: sellerId })
            .populate('seller', 'name email profileImageUrl');

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


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

        if (!product) return res.status(404).json({ message: "Product not found" })
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}

const deleteSellerProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.deleteOne();
        res.json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}


const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isBlocked = true;
        await user.save();
        res.status(200).json({ message: 'User blocked successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
}

const unblockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isBlocked = false;
        await user.save();

        res.status(200).json({ message: 'User unblocked successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })

    }
};

const getDashboardStats = async (req, res) => {
  try {
    const [sellerCount, userCount, adminCount, totalProduct] = await Promise.all([
      User.countDocuments({ role: "seller" }),
      User.countDocuments({ role: "member" }),
      User.countDocuments({ role: "admin" }),
      Product.countDocuments({})
    ]);

    const allCategories = [
      'Electronics', 'Furniture', 'Clothing', 'Books',
      'Beauty', 'Home Appliances', 'Toys', 'Sports', 'Other'
    ];

    const categoryCounts = await Product.aggregate([
      { $match: { category: { $exists: true, $ne: null } } },
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
    if (Array.isArray(categoryCounts)) {
      categoryCounts.forEach(cat => {
        countsMap[cat.category] = cat.count;
      });
    }

    const categoryProductCount = allCategories.map(cat => ({
      category: cat,
      count: countsMap[cat] || 0
    }));

    res.status(200).json({
      sellerCount,
      userCount,
      adminCount,
      totalProduct,
      categoryProductCount,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};


module.exports = {
    getAllSeller,
    getSeller,
    getSellerAllProducts,
    getSellerproduct,
    getAllProduct,
    getProduct,
    deleteSellerProduct,
    getDashboardStats,
    blockUser,
    unblockUser,
}


