// Sample API test file
// You can use this file to test the API endpoints manually

const baseURL = 'http://localhost:3000/api';

// Sample test data
const sampleUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

const sampleProduct = {
  name: 'Sample Product',
  price: 29.99,
  quantity: 100,
  description: 'This is a sample product for testing'
};

// Test functions
async function testUserRegistration() {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleUser),
    });
    
    const data = await response.json();
    console.log('User Registration Test:', data);
    return data;
  } catch (error) {
    console.error('Registration test failed:', error);
  }
}

async function testUserLogin() {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: sampleUser.email,
        password: sampleUser.password
      }),
    });
    
    const data = await response.json();
    console.log('User Login Test:', data);
    return data;
  } catch (error) {
    console.error('Login test failed:', error);
  }
}

async function testCreateProduct() {
  try {
    const response = await fetch(`${baseURL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleProduct),
    });
    
    const data = await response.json();
    console.log('Create Product Test:', data);
    return data;
  } catch (error) {
    console.error('Create product test failed:', error);
  }
}

async function testGetProducts() {
  try {
    const response = await fetch(`${baseURL}/products`);
    const data = await response.json();
    console.log('Get Products Test:', data);
    return data;
  } catch (error) {
    console.error('Get products test failed:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API Tests...\n');
  
  await testUserRegistration();
  await testUserLogin();
  await testCreateProduct();
  await testGetProducts();
  
  console.log('\nAPI Tests Completed!');
}

// Export for use with Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testUserRegistration,
    testUserLogin,
    testCreateProduct,
    testGetProducts,
    runTests
  };
}


// runTests();
