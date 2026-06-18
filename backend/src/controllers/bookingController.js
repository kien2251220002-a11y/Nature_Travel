import { bookingService } from '../services/bookingService.js';

export const bookingController = {
  async createBooking(req, res) {
    try {
      const userId = req.user.id; // From authMiddleware
      const { tour_id, booking_date, adults, children, note } = req.body;

      if (!tour_id || !booking_date) {
        return res.status(400).json({ error: 'Tour và ngày khởi hành là thông tin bắt buộc.' });
      }

      const result = await bookingService.createBooking({
        userId,
        tourId: tour_id,
        bookingDate: booking_date,
        adults,
        children,
        note
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error('CreateBooking Controller Error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }
};
