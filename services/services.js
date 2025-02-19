const Product = require('../model/model');

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get a product by ID
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Update a product by ID
const updateProductById = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a product by ID
const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const patchProductById = async (id, updates) => {
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    patchProductById,
    updateProductById,
    deleteProductById
};
