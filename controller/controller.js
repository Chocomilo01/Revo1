const productService = require('../services/services');
const upload = require('../middlewares/upload');

const createProduct = async (req, res) => {
    try {
        let productData = req.body;

        if (req.file) {
            console.log("Cloudinary Upload Successful: ", req.file.path); // Debugging
            productData.productImage = req.file.path; // Use Cloudinary image URL
        }

        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        const product = await productService.updateProductById(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const product = await productService.deleteProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};

const patchProductById = async (req, res) => {
    try {
        const product = await productService.patchProductById(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    patchProductById, // Add this to the export
    updateProductById,
    deleteProductById
};
