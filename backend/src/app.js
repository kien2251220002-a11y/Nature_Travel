import express from 'express';
import path from 'path';
import cors from 'cors';

// Import Route Handlers
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the whole 'frontend' directory as a static workspace
app.use(express.static(path.join(process.cwd(), 'frontend')));

// Back-end REST APIs
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/profile', profileRoutes);

// Front-end Web Page Navigation Routes (Pure HTML router)
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/home/home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/auth/login/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/auth/register/register.html'));
});

app.get('/tours', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/tours/tour_list/tour_list.html'));
});

app.get('/tour-detail', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/tours/tour_detail/tour_detail.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/booking/booking.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend/pages/profile/profile.html'));
});

// 404 Page Not Found handler
app.use((req, res) => {
  res.status(404).send('<h1>404 - Không tìm thấy trang yêu cầu</h1>');
});

export default app;
