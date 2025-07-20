import express from "express";
import {
  getTextbookById,
  getAllTextbooks,
} from "../controllers/textbookController";

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
 * components:
 *   schemas:
 *     Textbook:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         book_title:
 *           type: string
 *         author:
 *           type: string
 *         edition:
 *           type: string
 *         condition:
 *           type: string
 *         seller:
 *           type: integer
 *         date_posted:
 *           type: string
 *           format: date
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *         year:
 *           type: integer
 *         faculty:
 *           type: string
 *         price:
 *           type: number
 *         course_code:
 *           type: string
 */

export default router;
