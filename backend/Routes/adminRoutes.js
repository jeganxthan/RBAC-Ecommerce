const express = require('express');
const {
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
} = require('../controller/adminController');
const { protect, AdminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Sellers
router.get("/seller", protect, AdminOnly, getAllSeller);
router.get("/seller/:id", protect, AdminOnly, getSeller);
router.put("/seller/block/:id", protect, AdminOnly, blockUser);
router.put("/seller/unblock/:id", protect, AdminOnly, unblockUser);

// Seller Products
router.get("/seller-products", protect, AdminOnly, getSellerAllProducts);
router.get("/seller-products/:id", protect, AdminOnly, getSellerproduct);

// Products
router.get("/products", protect, AdminOnly, getAllProduct);
router.get("/products/:id", protect, AdminOnly, getProduct);
router.delete("/products/:id", protect, AdminOnly, deleteSellerProduct);

// Dashboard
router.get("/", protect, AdminOnly, getDashboardStats);

module.exports = router;
