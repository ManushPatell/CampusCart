import express from "express";
import {
  getAllRentals,
  getRentalById,
  postRental,
} from "../controllers/rentalController.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Rental listings
 */

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Get all rental listings
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: List of rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 */
router.get("/", getAllRentals);

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Get rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Rental found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Rental not found
 */
router.get("/:id", getRentalById);

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Create a new rental
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Rental'
 *
 *     responses:
 *       201:
 *         description: The newly created rental
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Database insert failed
 */
router.post("/", authenticateToken, postRental);

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         seller:
 *           type: string
 *         title:
 *           type: string
 *         contact:
 *           type: string
 *         address:
 *           type: string
 *         post_date:
 *           type: string
 *           format: date
 *         date_available:
 *           type: string
 *           format: date
 *         description:
 *           type: string
 *         house_type:
 *           type: string
 *           enum: [Apartment, House, Bedroom, Basement]
 *         cost:
 *           type: integer
 *         num_beds:
 *           type: integer
 *         is_cost_per_room:
 *           type: boolean
 *         is_utilities_included:
 *           type: boolean
 *         is_sublet:
 *           type: boolean
 *         has_laundry:
 *           type: boolean
 *         has_cooking:
 *           type: boolean
 *         has_parking:
 *           type: boolean
 *         no_smoking:
 *           type: boolean
 *         is_shared:
 *           type: boolean
 *         photos:
 *          type: array
 *          items:
 *            type: string
 */

export default router;
