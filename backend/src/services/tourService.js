import { tourRepository } from '../repositories/tourRepository.js';

export const tourService = {
  async getAllTours(filters = {}) {
    const search = filters.search || '';
    const location = filters.location || '';
    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
    const rating = filters.rating ? parseFloat(filters.rating) : null;

    return await tourRepository.findAll({ search, location, minPrice, maxPrice, rating });
  },

  async getTourById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error('ID Tour không hợp lệ.');
    }
    const tour = await tourRepository.findById(parsedId);
    if (!tour) {
      throw new Error('Không tìm thấy Tour du lịch mong muốn.');
    }
    return tour;
  }
};
