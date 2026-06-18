import { bookingRepository } from '../repositories/bookingRepository.js';
import { tourRepository } from '../repositories/tourRepository.js';

export const bookingService = {
  async createBooking({ userId, tourId, bookingDate, adults, children, note }) {
    const parsedTourId = parseInt(tourId, 10);
    const parsedAdults = parseInt(adults, 10) || 1;
    const parsedChildren = parseInt(children, 10) || 0;

    const tour = await tourRepository.findById(parsedTourId);
    if (!tour) {
      throw new Error('Không hiển thị đúng thông tin Tour đặt vé.');
    }

    // Dynamic price calculation
    // Adults: 100% price, Children: 50% price
    const adultPrice = tour.price;
    const childPrice = tour.price * 0.5;
    const totalPrice = (adultPrice * parsedAdults) + (childPrice * parsedChildren);

    const bookingId = await bookingRepository.create({
      userId,
      tourId: parsedTourId,
      bookingDate,
      adults: parsedAdults,
      children: parsedChildren,
      note,
      totalPrice
    });

    return {
      bookingId,
      totalPrice,
      message: 'Đặt Tour du lịch thành công.'
    };
  }
};
