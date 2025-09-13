import express from "express";
import {
  deleteMisc,
  getAllMisc,
  getMiscById,
  postMisc,
  putMisc,
} from "../controllers/miscController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Miscellaneous
 *   description: Miscellaneous endpoints
 */

/**
 * @swagger
 * /misc:
 *   get:
 *     summary: Get all miscellaneous items
 *     tags: [Miscellaneous]
 *     responses:
 *       200:
 *         description: List of miscellaneous items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/misc'
 *       404:
 *         description: Miscellaneous items not found
 *       500:
 *         description: An error occurred while fetching miscellaneous items
 */
router.get("/", getAllMisc);

/**
 * @swagger
 * /misc/{id}:
 *   get:
 *     summary: Get miscellaneous item by ID
 *     tags: [Miscellaneous]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the miscellaneous item to retrieve
 *     responses:
 *       200:
 *         description: Miscellaneous item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/misc'
 *       404:
 *         description: Miscellaneous item not found
 *       500:
 *         description: An error occurred while fetching the miscellaneous item
 */
router.get("/:id", getMiscById);

/**
 * @swagger
 * components:
 *   schemas:
 *     misc:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           example: "Electric guitar for sale"
 *         description:
 *           type: string
 *           example: "A Fender Stratocaster in excellent condition."
 *         price:
 *           type: number
 *           example: 250
 *         seller:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: "7f3d8a2b-45ef-4b8e-a23d-92c43d11f9c5"
 *             name:
 *               type: string
 *               example: "John Doe"
 *             email:
 *               type: string
 *               format: email
 *               example: "johndoe@example.com"
 *         date_posted:
 *           type: string
 *           format: date
 *           example: "2025-09-12"
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/photo1.jpg"
 *         listing_type:
 *           type: string
 *           enum: [Selling, Wanted]
 *           example: "Selling"
 */

/**
 * @swagger
 * /misc:
 *   post:
 *     summary: Create a miscellaneous listing
 *     description: Creates a miscellaneous posting. You must be signed in to create a listing.
 *     tags:
 *       - Miscellaneous
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Electric guitar for sale"
 *               description:
 *                 type: string
 *                 example: "A Fender Stratocaster in excellent condition."
 *               price:
 *                 type: number
 *                 example: 250
 *               listing_type:
 *                 type: string
 *                 enum: [Selling, Wanted]
 *                 example: Selling
 *               photos:
 *                 type: array
 *                 items:
 *                  type: string
 *             required:
 *               - title
 *               - description
 *               - price
 *               - listing_type
 *     responses:
 *       200:
 *         description: Miscellaneous listing successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 seller:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716"
 *                 listing_type:
 *                   type: string
 *                   enum: [Buying, Selling]
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - user must be signed in
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateToken, postMisc);

router.put("/:id", authenticateToken, putMisc);

/**
 * @swagger
 * /misc/{id}:
 *   delete:
 *     summary: Delete a misc
 *     description: Deletes a misc owned by the authenticated user.
 *     tags:
 *       - Misc
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the misc to delete.
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
router.delete("/:id", authenticateToken, deleteMisc);

export default router;
