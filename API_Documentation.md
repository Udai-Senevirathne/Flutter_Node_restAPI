# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Response Format
All responses follow this structure:
```json
{
  "success": boolean,
  "message": "string",
  "data": object|array,
  "count": number (for arrays),
  "errors": array (for validation errors)
}
```

## User Endpoints

### Register User
**POST** `/users/register`

**Request Body:**
```json
{
  "username": "udai",
  "email": "udai@gmail.com",
  "password": "123456"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "1",
    "username": "udai",
    "email": "udai@gmail.com",
    "createdAt": "2025-06-25T12:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Username must be at least 3 characters long"
  ]
}
```

### Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "udai@gmail.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "1",
    "username": "udai",
    "email": "udai@gmail.com"
  }
}
```

## Product Endpoints

### Get All Products
**GET** `/products`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": "1",
      "name": "iPhone 15 Pro Max",
      "price": 999.99,
      "quantity": 50,
      "description": "Latest iPhone model",
      "createdAt": "2025-06-25T12:00:00Z",
      "updatedAt": "2025-06-25T12:00:00Z"
    }
  ]
}
```

### Get Product by ID
**GET** `/products/:id`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "1",
    "name": "iPhone 15 Pro Max",
    "price": 999.99,
    "quantity": 50,
    "description": "Latest iPhone model",
    "createdAt": "2025-06-25T12:00:00Z",
    "updatedAt": "2025-06-25T12:00:00Z"
  }
}
```

### Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 999.99,
  "quantity": 50,
  "description": "Latest iPhone model"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "1",
    "name": "iPhone 15 Pro Max",
    "price": 999.99,
    "quantity": 50,
    "description": "Latest iPhone model",
    "createdAt": "2025-06-25T12:00:00Z",
    "updatedAt": "2025-06-25T12:00:00Z"
  }
}
```

### Update Product
**PUT** `/products/:id`

**Request Body:** (all fields optional)
```json
{
  "name": "iPhone 15 Pro Pro Max",
  "price": 1199.99,
  "quantity": 30
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "1",
    "name": "iPhone 15 Pro Pro Max",
    "price": 1199.99,
    "quantity": 30,
    "description": "Latest iPhone model",
    "createdAt": "2025-06-25T12:00:00Z",
    "updatedAt": "2025-06-25T12:30:00Z"
  }
}
```

### Delete Product
**DELETE** `/products/:id`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "1",
    "name": "iPhone 15 Pro Pro Max",
    "price": 1199.99,
    "quantity": 30,
    "description": "Latest iPhone model"
  }
}
```

### Search Products
**GET** `/products/search?q=searchterm`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Search completed successfully",
  "count": 1,
  "data": [
    {
      "id": "1",
      "name": "iPhone 15",
      "price": 999.99,
      "quantity": 50,
      "description": "Latest iPhone model"
    }
  ]
}
```

## Error Status Codes

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate user)
- **500**: Internal Server Error

## Flutter Integration Example

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';
  
  static Future<Map<String, dynamic>> registerUser(String username, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'username': username,
        'email': email,
        'password': password,
      }),
    );
    return json.decode(response.body);
  }
  
  static Future<Map<String, dynamic>> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );
    return json.decode(response.body);
  }
  
  static Future<List<dynamic>> getProducts() async {
    final response = await http.get(Uri.parse('$baseUrl/products'));
    final data = json.decode(response.body);
    return data['success'] ? data['data'] : [];
  }
  
  static Future<Map<String, dynamic>> createProduct(String name, double price, int quantity, String description) async {
    final response = await http.post(
      Uri.parse('$baseUrl/products'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'name': name,
        'price': price,
        'quantity': quantity,
        'description': description,
      }),
    );
    return json.decode(response.body);
  }
  
  static Future<Map<String, dynamic>> updateProduct(String id, Map<String, dynamic> updates) async {
    final response = await http.put(
      Uri.parse('$baseUrl/products/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(updates),
    );
    return json.decode(response.body);
  }
  
  static Future<Map<String, dynamic>> deleteProduct(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/products/$id'));
    return json.decode(response.body);
  }
}
```
