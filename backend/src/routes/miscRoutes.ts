import express from "express";
import { type Request, type Response, type NextFunction } from "express";
import { getAllMisc, getMiscById } from "../controllers/miscController";

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
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         seller:
 *           type: integer
 *         date_posted:
 *           type: string
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *         condition:
 *           type: string
 *         category:
 *           type: string
 */


export default router;
