import { Router } from 'express';
import { tourController } from '../controllers/tourController.js';

const router = Router();

router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);

export default router;
