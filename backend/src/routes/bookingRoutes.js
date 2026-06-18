import { Router } from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, bookingController.createBooking);

export default router;
