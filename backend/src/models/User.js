/**
 * User Model Fields definition
 * 
 * Column types in SQLite:
 * - id: INTEGER PRIMARY KEY AUTOINCREMENT
 * - full_name: TEXT NOT NULL
 * - email: TEXT UNIQUE NOT NULL
 * - password: TEXT NOT NULL
 * - phone: TEXT
 * - created_at: DATETIME DEFAULT CURRENT_TIMESTAMP
 */

export class User {
  constructor({ id, full_name, email, password, phone, created_at }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.created_at = created_at;
  }

  static validate(userData) {
    const errors = [];
    if (!userData.full_name || userData.full_name.trim() === '') {
      errors.push('Họ tên là bắt buộc.');
    }
    if (!userData.email || !userData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.push('Email không hợp lệ.');
    }
    if (!userData.password || userData.password.length < 6) {
      errors.push('Mật khẩu phải dài ít nhất 6 ký tự.');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
