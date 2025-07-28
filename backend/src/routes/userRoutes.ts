import express from "express";

import {
  getUserById,
  getAllUsers,
  postNewUser,
  getUserRentals,
  getUserTextbooks,
  getUserMisc,
} from "../controllers/userController.ts";

import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get single user with specific id.
 *     parameters:
 *           - in: path
 *             name: id
 *             schema:
 *                 type: integer
 *             required: true
 *             description: Numeric ID of the user to get.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: integer
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phoneNumber:
 *                      type: integer
 *       500:
 *           description: An error occurred.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */
router.get("/:id", getUserById);
router.get("/:id/rentals", getUserRentals);
router.get("/:id/textbooks", getUserTextbooks);
router.get("/:id/misc", getUserMisc);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all registered users..
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: integer
 *       500:
 *           description: An error occured.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *
 */
router.get("/", authenticateToken, getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register new user.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  phoneNumber:
 *                      type: integer
 *     responses:
 *       201:
 *         description: Single user.
 *
 *       400:
 *           description: Failed to provide required input parameters.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *       409:
 *           description: Provided email has been taken.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 *       500:
 *           description: An error occured.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */
router.post("/", postNewUser);

export default router;
