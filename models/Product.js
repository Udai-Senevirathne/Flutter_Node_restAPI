// MySQL Product Model
class Product {
  constructor(db) {
    this.db = db;
  }

  async create(productData) {
    const { name, price, quantity, description = '' } = productData;
    
    const [result] = await this.db.execute(
      'INSERT INTO products (name, price, quantity, description) VALUES (?, ?, ?, ?)',
      [name, price, quantity, description]
    );
    
    return await this.findById(result.insertId);
  }

  async findAll() {
    const [rows] = await this.db.execute(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  async update(id, productData) {
    const { name, price, quantity, description } = productData;
    
    await this.db.execute(
      'UPDATE products SET name = ?, price = ?, quantity = ?, description = ? WHERE id = ?',
      [name, price, quantity, description, id]
    );
    
    return await this.findById(id);
  }

  async delete(id) {
    const product = await this.findById(id);
    if (!product) return null;
    
    await this.db.execute('DELETE FROM products WHERE id = ?', [id]);
    return product;
  }

  async search(query) {
    const [rows] = await this.db.execute(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC',
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  }

  async findByName(name) {
    const [rows] = await this.db.execute(
      'SELECT * FROM products WHERE name = ?',
      [name]
    );
    return rows[0] || null;
  }

  async findByPriceRange(minPrice, maxPrice) {
    const [rows] = await this.db.execute(
      'SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY price ASC',
      [minPrice, maxPrice]
    );
    return rows;
  }

  async updateQuantity(id, quantity) {
    await this.db.execute(
      'UPDATE products SET quantity = ? WHERE id = ?',
      [quantity, id]
    );
    
    return await this.findById(id);
  }

  async getLowStockProducts(threshold = 10) {
    const [rows] = await this.db.execute(
      'SELECT * FROM products WHERE quantity <= ? ORDER BY quantity ASC',
      [threshold]
    );
    return rows;
  }
}

module.exports = Product;
