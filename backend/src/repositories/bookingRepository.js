import { run, query } from '../config/database.js';

export const bookingRepository = {
  async create({ userId, tourId, bookingDate, adults, children, note, totalPrice }) {
    const sql = `
      INSERT INTO bookings (user_id, tour_id, booking_date, adults, children, note, total_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await run(sql, [userId, tourId, bookingDate, adults, children, note, totalPrice]);
    return result.id;
  },

  async findByUserId(userId) {
    const sql = `
      SELECT b.*, t.name as tour_name, t.image as tour_image, t.location as tour_location, t.duration as tour_duration
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `;
    return await query(sql, [userId]);
  }
};
