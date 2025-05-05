import express from 'express';
import rentalController from '../controllers/rentalController';

const router = express.Router();

router.get("/:id", rentalController.getRentalById);
router.outer.post("/", rentalController.createRental);

module.exports = router;
