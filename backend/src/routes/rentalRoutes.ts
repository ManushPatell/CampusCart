import express from 'express';
import { getAllRentals, getRentalById } from '../controllers/rentalController.ts';

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
router.get('/', getAllRentals);

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
router.get('/:id', getRentalById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         price:
 *           type: string 
 *         location:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         details:
 *           type: object
 *           properties:
 *             available:
 *               type: string
 *             lease:
 *               type: string
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *         seller:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             contact:
 *               type: string
 */


export default router;
