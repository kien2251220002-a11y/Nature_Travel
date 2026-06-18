import { authService } from '../services/authService.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Vui lòng đăng nhập để thực hiện chức năng này.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc sai định dạng.' });
  }

  const token = parts[1];
  const userPayload = authService.verifyToken(token);

  if (!userPayload) {
    return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.' });
  }

  req.user = userPayload; // Attach verified payload (includes user id)
  next();
};
