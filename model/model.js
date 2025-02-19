const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productImage: { type: String, required: false },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    description: { type: String, required: true },
    availability: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    category: { type: String, required: true },
    size: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
