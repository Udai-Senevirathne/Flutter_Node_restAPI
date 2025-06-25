const Product = require('../models/Product');
const { productSchema, productUpdateSchema } = require('../validators/validation');
const dbConnection = require('../config/database');

class ProductController {
  constructor() {
    this.productModel = new Product(dbConnection.getConnection());
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await this.productModel.findAll();

      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        count: products.length,
        data: products
      });

    } catch (error) {
      console.error('Get products error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_NO_SUCH_TABLE') {
        return res.status(500).json({
          success: false,
          message: 'Products table not found. Please check database setup.'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error retrieving products',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Get single product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;

      // Validate ID format for MySQL
      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      const product = await this.productModel.findById(numericId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product
      });

    } catch (error) {
      console.error('Get product error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(500).json({
          success: false,
          message: 'Database field error'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error retrieving product',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Create new product
  async createProduct(req, res) {
    try {
      // Validate input
      const { error, value } = productSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      // Ensure description is always a string for MySQL
      const productData = {
        ...value,
        description: value.description || ''
      };

      const newProduct = await this.productModel.create(productData);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
      });

    } catch (error) {
      console.error('Create product error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Product with this name already exists'
        });
      } else if (error.code === 'ER_DATA_TOO_LONG') {
        return res.status(400).json({
          success: false,
          message: 'Input data too long for database field'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Update product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      // Validate ID format for MySQL
      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      // Validate input
      const { error, value } = productUpdateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      // First check if product exists
      const existingProduct = await this.productModel.findById(numericId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Merge existing data with update data (handle partial updates properly)
      const updateData = {
        name: value.name !== undefined ? value.name : existingProduct.name,
        price: value.price !== undefined ? value.price : existingProduct.price,
        quantity: value.quantity !== undefined ? value.quantity : existingProduct.quantity,
        description: value.description !== undefined ? value.description : (existingProduct.description || '')
      };

      const updatedProduct = await this.productModel.update(numericId, updateData);

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
      });

    } catch (error) {
      console.error('Update product error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'Product with this name already exists'
        });
      } else if (error.code === 'ER_DATA_TOO_LONG') {
        return res.status(400).json({
          success: false,
          message: 'Input data too long for database field'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error updating product',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Delete product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      // Validate ID format for MySQL
      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }

      const deletedProduct = await this.productModel.delete(numericId);

      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: deletedProduct
      });

    } catch (error) {
      console.error('Delete product error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
          success: false,
          message: 'Cannot delete product - it is referenced by other records'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Search products
  async searchProducts(req, res) {
    try {
      const { q: query } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      // Validate search query length
      if (query.length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Search query too long (max 100 characters)'
        });
      }

      // Escape special characters for MySQL LIKE query
      const sanitizedQuery = query.replace(/[%_\\]/g, '\\$&');
      const products = await this.productModel.search(sanitizedQuery);

      res.status(200).json({
        success: true,
        message: 'Search completed successfully',
        query: query,
        count: products.length,
        data: products
      });

    } catch (error) {
      console.error('Search products error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        return res.status(500).json({
          success: false,
          message: 'Database field error in search'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error searching products',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }
}

module.exports = new ProductController();
