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

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/seller", protect, adminOnly, getAllSeller);

router.get("/seller-products", protect, adminOnly, getSellerAllProducts);

router.get("/products", protect, adminOnly, getAllProduct);
router.get("/products/:id", protect, adminOnly, getProduct);
router.delete("/products/:id", protect, adminOnly, deleteSellerProduct);
router.get("/seller/:id", protect, adminOnly, getSeller);
router.put("/seller/block/:id", protect, adminOnly, blockUser);
router.put("/seller/unblock/:id", protect, adminOnly, unblockUser);
router.get("/seller-products/:sellerId/:productId", protect, adminOnly, getSellerproduct);

router.get("/", protect, adminOnly, getDashboardStats);

module.exports = router;
