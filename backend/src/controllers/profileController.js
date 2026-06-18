import { profileService } from '../services/profileService.js';
import { bookingRepository } from '../repositories/bookingRepository.js';

export const profileController = {
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const profile = await profileService.getUserProfile(userId);
      return res.status(200).json(profile);
    } catch (error) {
      console.error('GetProfile Controller Error:', error.message);
      return res.status(404).json({ error: error.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { full_name, phone } = req.body;

      const profile = await profileService.updateUserProfile(userId, {
        fullName: full_name,
        phone
      });
      return res.status(200).json(profile);
    } catch (error) {
      console.error('UpdateProfile Controller Error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async getUserBookings(req, res) {
    try {
      const userId = req.user.id;
      const bookings = await bookingRepository.findByUserId(userId);
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('GetUserBookings Controller Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};
