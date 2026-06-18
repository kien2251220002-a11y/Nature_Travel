import { queryOne, run } from '../config/database.js';

export const authRepository = {
  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return await queryOne(sql, [email]);
  },

  async findById(id) {
    const sql = `SELECT id, full_name, email, phone, created_at FROM users WHERE id = ?`;
    return await queryOne(sql, [id]);
  },

  async create({ fullName, email, password, phone }) {
    const sql = `
      INSERT INTO users (full_name, email, password, phone)
      VALUES (?, ?, ?, ?)
    `;
    const result = await run(sql, [fullName, email, password, phone]);
    return result.id;
  }
};
