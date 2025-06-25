const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', userController.register.bind(userController));

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', userController.login.bind(userController));

// @route   GET /api/users
// @desc    Get all users (optional endpoint)
// @access  Public 
router.get('/', userController.getAllUsers.bind(userController));

// @route   DELETE /api/users/:id
// @desc    Delete a user by ID
// @access  Public
router.delete('/:id', userController.deleteUser.bind(userController));

module.exports = router;
