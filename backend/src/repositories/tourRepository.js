import { query, queryOne } from '../config/database.js';

export const tourRepository = {
  async findAll({ search, location, minPrice, maxPrice, rating }) {
    let sql = `SELECT * FROM tours WHERE 1=1`;
    const params = [];

    if (search) {
      sql += ` AND (name LIKE ? OR description LIKE ? OR location LIKE ?)`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (location) {
      sql += ` AND location LIKE ?`;
      params.push(`%${location}%`);
    }

    if (minPrice !== undefined && minPrice !== null) {
      sql += ` AND price >= ?`;
      params.push(minPrice);
    }

    if (maxPrice !== undefined && maxPrice !== null) {
      sql += ` AND price <= ?`;
      params.push(maxPrice);
    }

    if (rating !== undefined && rating !== null) {
      sql += ` AND rating >= ?`;
      params.push(rating);
    }

    // Default sorting by popular rating descend
    sql += ` ORDER BY rating DESC`;

    return await query(sql, params);
  },

  async findById(id) {
    const sql = `SELECT * FROM tours WHERE id = ?`;
    return await queryOne(sql, [id]);
  }
};
