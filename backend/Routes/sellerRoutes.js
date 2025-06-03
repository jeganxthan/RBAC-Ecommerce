const express = require('express');
const router = express.Router();

const { 
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboard,
} = require('../controller/sellerController');

const { protect, sellerOnly } = require('../middleware/authMiddleware');
const {productUpload}  = require("../middleware/uploadMiddleware");

router.get("/", protect, getAllProduct);                
router.get("/:id", protect, getProduct);                

router.post("/", protect, sellerOnly, productUpload.array("images", 5), createProduct);
router.put("/:id", protect, sellerOnly, productUpload.array("images", 5), updateProduct); 

router.get("/dashboard", protect, sellerOnly, getDashboard); 
router.delete("/:id", protect, sellerOnly, deleteProduct); 

module.exports = router;
