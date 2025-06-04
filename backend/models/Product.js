const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  images: [
    {
      type: String,
      required: [true, 'At least one image URL is required']
    }
  ],
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  specs: [specSchema],
   category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Furniture',
      'Clothing',
      'Books',
      'Beauty',
      'Home Appliances',
      'Toys',
      'Sports',
      'Other'
    ]
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  rating: [ratingSchema],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
