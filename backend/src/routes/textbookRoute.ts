import express from "express";
import {
  getTextbookById,
  getAllTextbooks,
  postTextbook,
  deleteTextbook,
  putTextbook,
} from "../controllers/textbookController";
import { authenticateToken } from "../middleware/authMiddleware";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Textbooks
 *     description: Textbook listings
 */

/**
 * @swagger
 * /textbooks:
 *   get:
 *     summary: Get all textbook listings
 *     tags: [Textbooks]
 *     responses:
 *       200:
 *         description: List of textbooks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Textbook'
 *       404:
 *         description: Textbooks not found
 *       500:
 *         description: An error occurred while fetching textbooks
 */
router.get("/", getAllTextbooks);

/**
 * @swagger
 * /textbooks/{id}:
 *   get:
 *     summary: Get textbook by ID
 *     tags: [Textbooks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Textbook ID
 *     responses:
 *       200:
 *         description: Textbook found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Textbook'
 *       404:
 *         description: Textbook not found
 */
router.get("/:id", getTextbookById);

/**
 * @swagger
 * /textbooks:
 *   post:
 *     summary: Add a new textbook
 *     description: Creates a new textbook entry in the system.
 *     tags:
 *       - Textbooks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - book_title
 *               - price
 *             properties:
 *               book_title:
 *                 type: string
 *                 example: "Introduction to Algorithms"
 *               author:
 *                 type: string
 *                 example: "Thomas H. Cormen"
 *               edition:
 *                 type: string
 *                 example: "3rd"
 *               year:
 *                 type: integer
 *                 enum: [1, 2, 3, 4]
 *               faculty:
 *                 type: string
 *                 example: "Computer Science"
 *               price:
 *                 type: integer
 *                 example: 80
 *               condition:
 *                 type: string
 *                 enum: [Used, New]
 *     responses:
 *       200:
 *         description: Textbook successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 book_title: "Introduction to Algorithms"
 *                 author: "Andrew I."
 *       400:
 *         description: Missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "Failed to provide required parameters."
 *       500:
 *         description: Server error while posting the textbook.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: "Error posting new textbook."
 */
router.post("/", authenticateToken, postTextbook);

router.put("/:id", authenticateToken, putTextbook);

/**
 * @swagger
 * components:
 *   schemas:
 *     Textbook:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         book_title: { type: string }
 *         author: { type: string }
 *         edition: { type: string }
 *         condition: { type: string }
 *         year: { type: integer }
 *         faculty: { type: string }
 *         price: { type: number }
 *         photos:
 *           type: array
 *           items: { type: string }
 *         date_posted: { type: string, format: date }
 *         seller:
 *           type: object
 *           properties:
 *             id: { type: string, format: uuid }
 *             name: { type: string }
 *             email: { type: string, format: email }
 */

/**
 * @swagger
 * /textbooks/{id}:
 *   delete:
 *     summary: Delete a textbook
 *     description: Deletes a textbook owned by the authenticated user.
 *     tags:
 *       - Textbooks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the textbook to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Textbook successfully deleted. No content returned.
 *       401:
 *         description: Invalid delete request (either textbook not found or unauthorized).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid delete request
 *       500:
 *         description: Internal server error while deleting the textbook.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete textbook
 */
router.delete("/:id", authenticateToken, deleteTextbook);

export default router;
