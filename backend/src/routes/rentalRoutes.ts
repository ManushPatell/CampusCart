import express from 'express';

import {
  getRentalById,
  getAllRentals,
} from '../controllers/rentalController.ts';

const router = express.Router();

router.get('/', getAllRentals);
router.get('/:id', getRentalById);

export default router;
