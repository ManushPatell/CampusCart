import express from "express";

import {
  getUserById,
  getAllUsers,
  postNewUser,
  getUserRentals,
  getUserTextbooks,
  getUserMisc,
  putUser,
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
 *   put:
 *     summary: Update the authenticated user's details
 *     description: Updates the currently authenticated user's profile information. Requires authentication.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@mcmaster.com
 *               phoneNumber:
 *                 type: string
 *                 example: "301-123-1233"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'   # Assuming you have a User schema defined
 *       400:
 *         description: Missing required fields in request body
 *         content:
 *           application/json:
 *             example: "Failed to provide required param in the body of the request."
 *       401:
 *         description: Unauthorized - User is not authenticated
 */
router.put("/", authenticateToken, putUser);

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
 *                      type: string
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
