const bcrypt = require('bcryptjs');

// MySQL User Model
class User {
  constructor(db) {
    this.db = db;
  }

  async create(userData) {
    const { username, email, password } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await this.db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    return await this.findById(result.insertId);
  }

  async findByEmail(email) {
    const [rows] = await this.db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  async findByUsername(username) {
    const [rows] = await this.db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  }

  async findById(id) {
    const [rows] = await this.db.execute(
      'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  async findByEmailWithPassword(email) {
    const [rows] = await this.db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  async getAllUsers() {
    const [rows] = await this.db.execute(
      'SELECT id, username, email, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  }

  async updateUser(id, userData) {
    const { username, email } = userData;
    
    await this.db.execute(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, id]
    );
    
    return await this.findById(id);
  }

  async deleteUser(id) {
    const user = await this.findById(id);
    if (!user) return null;
    
    await this.db.execute('DELETE FROM users WHERE id = ?', [id]);
    return user;
  }
}

module.exports = User;
