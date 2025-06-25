const mysql = require('mysql2/promise');

class MySQLConnection {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }
  // Initialize MySQL connection
  async connect() {
    try {
      console.log('🔄 Trying to connect to MySQL...');
      await this.connectMySQL();
      this.isConnected = true;
    } catch (error) {
      console.error('❌ MySQL connection failed:', error.message);
      this.isConnected = false;
      process.exit(1);
    }
  }
  // Connect to MySQL database using environment variables
  async connectMySQL() {
    try {
      const requiredVars = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_DATABASE'];
      const missingVars = requiredVars.filter(varName => !process.env[varName]);

      if (missingVars.length > 0) {
        throw new Error(`Missing required MySQL environment variables: ${missingVars.join(', ')}`);
      }

      this.connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT) || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        charset: 'utf8mb4',
        timezone: '+00:00'
      });

      const connection = await this.connection.getConnection();
      await connection.ping();
      connection.release();

      console.log('✅ MySQL connected successfully');
      console.log(`📍 Connected to: ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`);

      await this.createMySQLTables();
      this.setupConnectionErrorHandling();

    } catch (error) {
      console.error('❌ MySQL connection failed:', error.message);
      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('💡 Check your MySQL username and password');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('💡 Make sure MySQL server is running');
      } else if (error.code === 'ER_BAD_DB_ERROR') {
        console.error('💡 Database does not exist. Create it first in phpMyAdmin');
      }
      throw error;
    }
  }
  // Create MySQL tables if they do not exist
  async createMySQLTables() {
    try {
      console.log('🔧 Creating MySQL tables...');

      await this.connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_username (username),
          INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      await this.connection.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          quantity INT NOT NULL DEFAULT 0,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_name (name),
          INDEX idx_price (price),
          INDEX idx_created_at (created_at),
          CONSTRAINT chk_price CHECK (price >= 0),
          CONSTRAINT chk_quantity CHECK (quantity >= 0)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);

      console.log('✅ MySQL tables created successfully');
      await this.displayTableInfo();
      
    } catch (error) {
      console.error('❌ Error creating MySQL tables:', error.message);
      throw error;
    }
  }

  async displayTableInfo() {
    try {
      const [rows] = await this.connection.query("SHOW TABLES");
      const tableNames = rows.map(row => Object.values(row)[0]);
      console.log('📋 Tables in the database:', tableNames.join(', '));
    } catch (error) {
      console.error('❌ Failed to retrieve table info:', error.message);
    }
  }

  setupConnectionErrorHandling() {
    this.connection.on('error', (err) => {
      console.error('❗ MySQL Pool Error:', err.message);
    });
  }

  getConnection() {
    return this.connection;
  }

  getDbType() {
    return 'mysql';
  }
}

module.exports = new MySQLConnection();
