const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profileImageUrl: { type: String, default: null },
    role: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user"
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            }
        }
    ]

}, {
    timestamps: true
})
module.exports = mongoose.model("User", UserSchema);