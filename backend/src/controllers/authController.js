import { authService } from '../services/authService.js';

export const authController = {
  async register(req, res) {
    try {
      const { full_name, email, password, phone } = req.body;
      if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'Họ tên, email và mật khẩu là bắt buộc.' });
      }

      const result = await authService.register({
        fullName: full_name,
        email,
        password,
        phone
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error('Register Controller Error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc.' });
      }

      const result = await authService.login({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login Controller Error:', error.message);
      return res.status(401).json({ error: error.message });
    }
  }
};
