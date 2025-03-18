const express = require('express');
const router = express.Router();
const productController = require('../controller/controller');
const upload = require('../middlewares/upload');

// Create a product
router.post('/products', upload.single('productImage'), productController.createProduct);
// Get all products
router.get('/products', productController.getAllProducts);

// Get a product by ID
router.get('/products/:id', productController.getProductById);

// Update a product by ID
router.put('/products/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProductById);

router.patch('/products/:id', productController.patchProductById);

module.exports = router;
