import { tourService } from '../services/tourService.js';

export const tourController = {
  async getAllTours(req, res) {
    try {
      const { search, location, minPrice, maxPrice, rating } = req.query;
      const tours = await tourService.getAllTours({
        search,
        location,
        minPrice,
        maxPrice,
        rating
      });
      return res.status(200).json(tours);
    } catch (error) {
      console.error('GetAllTours Controller Error:', error.message);
      return res.status(500).json({ error: error.message });
    }
  },

  async getTourById(req, res) {
    try {
      const { id } = req.params;
      const tour = await tourService.getTourById(id);
      return res.status(200).json(tour);
    } catch (error) {
      console.error('GetTourById Controller Error:', error.message);
      return res.status(404).json({ error: error.message });
    }
  }
};
