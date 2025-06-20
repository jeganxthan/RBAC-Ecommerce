const express = require("express")
const { protect } = require("../middleware/authMiddleware");
const { getAllProduct,
    getProduct,
    getUserProfile,
    updateUserProfile,
    addToCart,
    getCart,
    removeFromCart,
    getProductSuggestions,
    getCartCount } = require("../controller/userController");

const router = express.Router();

router.get('/', protect, getAllProduct);
router.get('/profile', protect, getUserProfile);
router.get('/getcart', protect, getCart);
router.get('/cartcount', protect, getCartCount);
router.get('/search', getProductSuggestions);
router.put('/updateprofile', protect, updateUserProfile);
router.post('/addcart', protect, addToCart);
router.delete('/cart/:productId', protect, removeFromCart);
router.get('/:id', protect, getProduct);
module.exports = router;