import { queryOne, run } from '../config/database.js';

export const profileRepository = {
  async getProfile(userId) {
    const sql = `SELECT id, full_name, email, phone, created_at FROM users WHERE id = ?`;
    return await queryOne(sql, [userId]);
  },

  async updateProfile(userId, { fullName, phone }) {
    const sql = `
      UPDATE users
      SET full_name = ?, phone = ?
      WHERE id = ?
    `;
    const result = await run(sql, [fullName, phone, userId]);
    return result.changes > 0;
  }
};
