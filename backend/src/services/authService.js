import crypto from 'crypto';
import { authRepository } from '../repositories/authRepository.js';

// SECURE PASSWORD HASHING FUNCTION
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export const authService = {
  async register({ fullName, email, password, phone }) {
    // Check if email already registered
    const existingUser = await authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email này đã được sử dụng bởi một tài khoản khác.');
    }

    const hashedPassword = hashPassword(password);
    const userId = await authRepository.create({
      fullName,
      email,
      password: hashedPassword,
      phone
    });

    const user = await authRepository.findById(userId);
    const token = this.generateToken(user);

    return { user, token };
  },

  async login({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    // Omit sensitive data
    const userProfile = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at
    };

    const token = this.generateToken(userProfile);
    return { user: userProfile, token };
  },

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64url');
  },

  verifyToken(token) {
    try {
      if (!token) return null;
      const jsonStr = Buffer.from(token, 'base64url').toString('utf8');
      const payload = JSON.parse(jsonStr);
      
      if (payload.exp < Date.now()) {
        console.warn('Session token expired');
        return null;
      }
      return payload;
    } catch (e) {
      console.error('Failed to verify token:', e.message);
      return null;
    }
  }
};
