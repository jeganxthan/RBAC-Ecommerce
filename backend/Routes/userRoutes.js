const express = require("express")
const {protect} = require("../middleware/authMiddleware");
const { getAllProduct, getProduct } = require("../controller/userController");

const router = express.Router();

router.get('/', protect, getAllProduct);
router.get('/:id', protect, getProduct);
module.exports = router;