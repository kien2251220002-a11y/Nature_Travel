/**
 * Booking Model Fields definition
 * 
 * Column types in SQLite:
 * - id: INTEGER PRIMARY KEY AUTOINCREMENT
 * - user_id: INTEGER NOT NULL
 * - tour_id: INTEGER NOT NULL
 * - booking_date: TEXT NOT NULL
 * - adults: INTEGER NOT NULL
 * - children: INTEGER NOT NULL
 * - note: TEXT
 * - total_price: REAL NOT NULL
 * - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP
 */

export class Booking {
  constructor({ id, user_id, tour_id, booking_date, adults, children, note, total_price, created_at }) {
    this.id = id;
    this.user_id = user_id;
    this.tour_id = tour_id;
    this.booking_date = booking_date;
    this.adults = adults;
    this.children = children;
    this.note = note;
    this.total_price = total_price;
    this.created_at = created_at;
  }

  static validate(bookingData) {
    const errors = [];
    if (!bookingData.tour_id) {
      errors.push('Tour ID là bắt buộc.');
    }
    if (!bookingData.booking_date) {
      errors.push('Ngày khởi hành là bắt buộc.');
    }
    const adultsCount = parseInt(bookingData.adults, 10);
    if (isNaN(adultsCount) || adultsCount <= 0) {
      errors.push('Số lượng người lớn phải lớn hơn 0.');
    }
    const childrenCount = parseInt(bookingData.children, 10);
    if (isNaN(childrenCount) || childrenCount < 0) {
      errors.push('Số lượng trẻ em không được phép âm.');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
