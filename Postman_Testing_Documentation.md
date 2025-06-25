# 📮 **Postman Testing Guide**

## 🚀 **Quick Setup:**

### 1. **Start Your Server:**
```bash
npm run dev
```
Server should be running on: `http://localhost:3000`

### 2. **Import Collection to Postman:**
- Open Postman
- Click "Import" button
- Select `postman-collection.json` file
- Collection "MySQL REST API - Node.js" will be imported

## 📋 **Testing Order (Recommended):**

### **Step 1: Test API Info**
- **Request:** `GET http://localhost:3000/`
- **Expected:** API information with all endpoints

### **Step 2: User Registration**
- **Request:** `POST /api/users/register`
- **Body (JSON):**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Expected:** User created with ID

### **Step 3: User Login**
- **Request:** `POST /api/users/login`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Expected:** Login successful with user data

### **Step 4: Create Product**
- **Request:** `POST /api/products`
- **Body (JSON):**
```json
{
  "name": "iPhone 15",
  "price": 999.99,
  "quantity": 50,
  "description": "Latest iPhone model"
}
```
- **Expected:** Product created with ID

### **Step 5: Get All Products**
- **Request:** `GET /api/products`
- **Expected:** Array of all products

### **Step 6: Get Product by ID**
- **Request:** `GET /api/products/1`
- **Expected:** Single product data

### **Step 7: Update Product**
- **Request:** `PUT /api/products/1`
- **Body (JSON):**
```json
{
  "name": "iPhone 15 Pro",
  "price": 1199.99
}
```
- **Expected:** Updated product data

### **Step 8: Search Products**
- **Request:** `GET /api/products/search?q=iPhone`
- **Expected:** Products matching search query

### **Step 9: Delete Product**
- **Request:** `DELETE /api/products/1`
- **Expected:** Deleted product confirmation

## 🔧 **Manual Postman Setup (Alternative):**

If you prefer manual setup, create these requests:

### **Base URL:** `http://localhost:3000/api`

### **User Endpoints:**
1. **POST** `/users/register`
   - Headers: `Content-Type: application/json`
   - Body: Raw JSON with username, email, password

2. **POST** `/users/login`
   - Headers: `Content-Type: application/json`
   - Body: Raw JSON with email, password

3. **GET** `/users`
   - No body required

### **Product Endpoints:**
1. **GET** `/products` - Get all products
2. **GET** `/products/:id` - Get single product
3. **POST** `/products` - Create product (JSON body)
4. **PUT** `/products/:id` - Update product (JSON body)
5. **DELETE** `/products/:id` - Delete product
6. **GET** `/products/search?q=query` - Search products

## 📊 **Sample Test Data:**

### **User Registration:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### **Product Creation:**
```json
{
  "name": "MacBook Pro",
  "price": 1999.99,
  "quantity": 15,
  "description": "14-inch MacBook Pro with M3 chip"
}
```

### **Product Update:**
```json
{
  "price": 1899.99,
  "quantity": 20
}
```

## ✅ **Expected Response Format:**

### **Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10
}
```

### **Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation details"]
}
```

## 🐛 **Common Issues & Solutions:**

### **1. Connection Refused:**
- Make sure server is running: `npm run dev`
- Check if port 3000 is available

### **2. Database Errors:**
- Ensure MySQL is running
- Check `.env` file configuration
- Verify database `rest_api_db` exists

### **3. Validation Errors:**
- Check JSON format in request body
- Ensure required fields are included
- Verify data types (numbers, strings)

### **4. 404 Errors:**
- Check URL paths are correct
- Ensure API base URL is `http://localhost:3000/api`

## 🎯 **Testing Tips:**

1. **Test in Order:** Follow the recommended testing sequence
2. **Check Status Codes:** 200/201 for success, 400/404/500 for errors
3. **Validate Responses:** Ensure response structure matches expected format
4. **Test Edge Cases:** Try invalid data, missing fields, wrong IDs
5. **Use Variables:** Set up Postman variables for dynamic testing

## 📱 **Ready for Flutter Integration:**

Once tested in Postman, your API is ready for Flutter integration using the same endpoints and request formats!

Happy Testing! 🚀
