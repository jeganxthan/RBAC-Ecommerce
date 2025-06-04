const express = require("express")
const {protect} = require("../middleware/authMiddleware");
const { getAllProduct,
    getProduct,
    getUserProfile,
    updateUserProfile,
    addToCart,
    getCart,
    removeFromCart, } = require("../controller/userController");

const router = express.Router();

router.get('/', protect, getAllProduct);
router.get('/profile', protect, getUserProfile);
router.get('/getcart', protect, getCart);
router.get('/:id', protect, getProduct);
router.put('/updateprofile', protect, updateUserProfile);
router.post('/addcart', protect, addToCart);
router.delete('/cart/:productId', protect, removeFromCart);
module.exports = router;