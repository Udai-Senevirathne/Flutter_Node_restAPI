const User = require('../models/User');
const { userRegistrationSchema, userLoginSchema } = require('../validators/validation');
const dbConnection = require('../config/database');

class UserController {
  constructor() {
    this.userModel = new User(dbConnection.getConnection());
  }

  // Register a new user
  async register(req, res) {
    try {
      // Validate input
      const { error, value } = userRegistrationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { username, email, password } = value;

      // Check if user already exists
      const [existingEmail, existingUsername] = await Promise.all([
        this.userModel.findByEmail(email),
        this.userModel.findByUsername(username)
      ]);

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'User already exists with this email address'
        });
      }

      if (existingUsername) {
        return res.status(409).json({
          success: false,
          message: 'Username is already taken'
        });
      }

      // Create new user
      const newUser = await this.userModel.create({ username, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.created_at
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          message: 'User already exists with this email or username'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      // Validate input
      const { error, value } = userLoginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      const { email, password } = value;

      // Find user by email (with password for comparison)
      const user = await this.userModel.findByEmailWithPassword(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isPasswordValid = await this.userModel.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.created_at
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Error logging in',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Get all users (optional endpoint)
  async getAllUsers(req, res) {
    try {
      const users = await this.userModel.getAllUsers();

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        count: users.length,
        data: users
      });

    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }

  // Delete user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Validate ID format
      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const deletedUser = await this.userModel.deleteUser(numericId);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: {
          id: deletedUser.id,
          username: deletedUser.username,
          email: deletedUser.email
        }
      });

    } catch (error) {
      console.error('Delete user error:', error);
      
      // Handle MySQL specific errors
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({
          success: false,
          message: 'Cannot delete user - user has associated records'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
      });
    }
  }
}

module.exports = new UserController();
