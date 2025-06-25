const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', productController.getAllProducts.bind(productController));

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', productController.searchProducts.bind(productController));

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', productController.getProductById.bind(productController));

// @route   POST /api/products
// @desc    Create new product
// @access  Public
router.post('/', productController.createProduct.bind(productController));

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Public
router.put('/:id', productController.updateProduct.bind(productController));

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Public
router.delete('/:id', productController.deleteProduct.bind(productController));

module.exports = router;
