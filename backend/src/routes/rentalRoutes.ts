import express from "express";
import {
  deleteRental,
  getAllRentals,
  getRentalById,
  postRental,
  putRental,
} from "../controllers/rentalController";
import { authenticateToken } from "../middleware/authMiddleware";

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

/**
 * @swagger
 * /rentals/{rentalId}:
 *   put:
 *     summary: Update a rental listing
 *     description: Edits an existing rental. Requires authentication.
 *     tags:
 *       - Rentals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rental to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - address
 *               - date_available
 *               - description
 *               - house_type
 *               - cost
 *               - num_beds
 *               - is_cost_per_room
 *               - is_utilities_included
 *               - is_sublet
 *               - has_laundry
 *               - has_cooking
 *               - has_parking
 *               - no_smoking
 *               - is_shared
 *               - photos
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cozy Apartment Near Campus"
 *               address:
 *                 type: string
 *                 example: "123 College Ave, Cityville"
 *               date_available:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-09-27T00:00:00.000Z"
 *               description:
 *                 type: string
 *                 example: "A nice place close to the university."
 *               house_type:
 *                 type: string
 *                 example: "Apartment"
 *               cost:
 *                 type: number
 *                 example: 1200
 *               num_beds:
 *                 type: integer
 *                 example: 2
 *               is_cost_per_room:
 *                 type: boolean
 *                 example: false
 *               is_utilities_included:
 *                 type: boolean
 *                 example: true
 *               is_sublet:
 *                 type: boolean
 *                 example: false
 *               has_laundry:
 *                 type: boolean
 *                 example: true
 *               has_cooking:
 *                 type: boolean
 *                 example: true
 *               has_parking:
 *                 type: boolean
 *                 example: false
 *               no_smoking:
 *                 type: boolean
 *                 example: true
 *               is_shared:
 *                 type: boolean
 *                 example: false
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "https://example.com/photo1.jpg"
 *                   - "https://example.com/photo2.jpg"
 *     responses:
 *       200:
 *         description: Rental updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rental:
 *                   $ref: '#/components/schemas/Rental'
 *       401:
 *         description: Not authorized to edit this rental
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not authorized to edit this rental"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to insert rental"
 *
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         title:
 *           type: string
 *         address:
 *           type: string
 *         date_available:
 *           type: string
 *           format: date-time
 *         post_date:
 *           type: string
 *         description:
 *           type: string
 *         house_type:
 *           type: string
 *         cost:
 *           type: number
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
 *           type: array
 *           items:
 *             type: string
 */
router.put("/:id", authenticateToken, putRental);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         title: { type: string }
 *         address: { type: string }
 *         post_date: { type: string, format: date }
 *         date_available: { type: string, format: date }
 *         description: { type: string }
 *         house_type:
 *           type: string
 *           enum: [Apartment, House, Bedroom, Basement]
 *         cost: { type: integer }
 *         num_beds: { type: integer }
 *         is_cost_per_room: { type: boolean }
 *         is_utilities_included: { type: boolean }
 *         is_sublet: { type: boolean }
 *         has_laundry: { type: boolean }
 *         has_cooking: { type: boolean }
 *         has_parking: { type: boolean }
 *         no_smoking: { type: boolean }
 *         is_shared: { type: boolean }
 *         photos:
 *           type: array
 *           items: { type: string }
 *         seller:
 *           type: object
 *           properties:
 *             id: { type: string, format: uuid }
 *             name: { type: string }
 *             email: { type: string, format: email }
 */
