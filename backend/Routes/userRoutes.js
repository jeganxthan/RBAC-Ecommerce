const express = require("express");
const {
  getAllProduct,
  getProduct,
  getUserProfile,
  updateUserProfile,
  addToCart,
  getCart,
  removeFromCart,
  getProductSuggestions,
  getCartCount, 
  payment
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getAllProduct);
router.get("/profile", protect, getUserProfile);
router.get("/getcart", protect, getCart);
router.get("/cartcount", protect, getCartCount);
router.get("/search", getProductSuggestions);
router.put("/updateprofile", protect, updateUserProfile);
router.post("/addcart", protect, addToCart);
router.post("/payment", protect, payment);
router.delete("/cart/:productId", protect, removeFromCart);
router.get("/:id", protect, getProduct);

module.exports = router;
