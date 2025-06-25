<<<<<<< HEAD
# REST API with Node.js + Express

A RESTful API built with Node.js and Express.js that supports both MySQL and MongoDB databases. This API provides user registration/login functionality and full CRUD operations for product management.

## Features

- 🚀 **User Management**: Registration and Login (authentication not required as specified)
- 📦 **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- 🗄️ **Database Support**: Both MySQL and MongoDB
- ✅ **Data Validation**: Comprehensive input validation using Joi
- 🔧 **Error Handling**: Proper error responses and logging
- 📱 **Flutter Ready**: Perfect for Flutter mobile app integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databases**: MySQL / MongoDB
- **Validation**: Joi
- **Security**: bcryptjs for password hashing
- **Environment**: dotenv for configuration

## Project Structure

```
rest-api-flutter-nodejs/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   ├── userController.js    # User-related business logic
│   └── productController.js # Product-related business logic
├── models/
│   ├── User.js             # User model (MongoDB & MySQL)
│   └── Product.js          # Product model (MongoDB & MySQL)
├── routes/
│   ├── userRoutes.js       # User API routes
│   └── productRoutes.js    # Product API routes
├── validators/
│   └── validation.js       # Input validation schemas
├── .env                    # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Main application file
└── README.md              # This file
```

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy `.env` file and configure your database settings
   - Choose between MySQL or MongoDB by setting `DB_TYPE`

4. **Database Setup**:

   **For MySQL:**
   - Create a database named `rest_api_db` (or your preferred name)
   - Update MySQL connection details in `.env`
   - Tables will be created automatically when the server starts

   **For MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env`
   - Collections will be created automatically

## Configuration

Update the `.env` file with your database credentials:

```env
# Choose database type
DB_TYPE=mysql    # or mongodb

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=rest_api_db

# MongoDB Configuration (if using MongoDB)
# MONGODB_URI=mongodb://localhost:27017/rest_api_db
```

## Running the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Root Endpoint
- **GET** `/` - API information and available endpoints

### User Endpoints
- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login user

### Product Endpoints
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **GET** `/api/products/search?q=query` - Search products
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

## API Usage Examples

### User Registration
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### User Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product
```bash
POST /api/products
Content-Type: application/json

{
  "name": "iPhone 15",
  "price": 999.99,
  "quantity": 50,
  "description": "Latest iPhone model"
}
```

### Update Product
```bash
PUT /api/products/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 1199.99,
  "quantity": 30
}
```

### Get All Products
```bash
GET /api/products
```

### Search Products
```bash
GET /api/products/search?q=iPhone
```

## Data Models

### User Model
- `username` (string, required, unique, 3-50 chars)
- `email` (string, required, unique, valid email)
- `password` (string, required, min 6 chars, hashed)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

### Product Model
- `name` (string, required, 2-100 chars)
- `price` (number, required, positive)
- `quantity` (integer, required, min 0)
- `description` (string, optional, max 500 chars)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error details"],
  "error": "Technical error (development only)"
}
```

## Flutter Integration

This API is designed to work seamlessly with Flutter applications. Use the `http` package in Flutter to make requests:

```dart
// Example Flutter code
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';
  
  // Register user
  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(userData),
    );
    return json.decode(response.body);
  }
  
  // Get products
  static Future<List<dynamic>> getProducts() async {
    final response = await http.get(Uri.parse('$baseUrl/products'));
    final data = json.decode(response.body);
    return data['data'];
  }
}
```

## Error Handling

The API includes comprehensive error handling:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate user)
- **500**: Internal Server Error

## Development

For development, you can use:
```bash
npm run dev  # Starts with nodemon for auto-restart
```

## Security Features

- Password hashing with bcryptjs
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- NoSQL injection prevention (MongoDB)
- CORS enabled for cross-origin requests

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **bcryptjs**: Password hashing
- **joi**: Data validation
- **mysql2**: MySQL driver
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT token handling (for future auth)

## License

ISC License

## Support

For issues or questions, please check the code comments or create an issue in the repository.
=======
# Flutter_Node_restAPI
>>>>>>> c0321d07e569601bcdec35c9ad47d263b9f8572f
