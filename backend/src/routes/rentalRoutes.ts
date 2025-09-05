import express from "express";
import {
  deleteRental,
  getAllRentals,
  getRentalById,
  postRental,
  putRental,
} from "../controllers/rentalController";
import { authenticateToken } from "../middleware/authMiddleware";
import { uploadImage } from "../controllers/uploadController";

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
 * /rentals/{id}:
 *   delete:
 *     summary: Delete a rental
 *     description: Deletes a rental owned by the authenticated user.
 *     tags:
 *       - Rentals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the rental to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Rental successfully deleted. No content returned.
 *       401:
 *         description: Invalid delete request (either rental not found or unauthorized).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid delete request
 *       500:
 *         description: Internal server error while deleting the rental.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete rental
 */
router.delete("/:id", authenticateToken, deleteRental);

router.put("/:id", authenticateToken, putRental);

export default router;

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
