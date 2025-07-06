import express from 'express';
import { GetTextbookById, GetAllTextbooks } from '../controllers/textbookController';

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
router.get('/', GetAllTextbooks);

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
router.get('/:id', GetTextbookById);

export default router;