import express from 'express';

import {
  getUserById,
  getAllUsers,
  postNewUser,
} from '../controllers/userController.ts';

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
 *           description: An error occured.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */
router.get('/:id', getUserById);

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
router.get('/', getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register new user.
 *     tags: [Users]
 *     responses:
 *       201:
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
 *       400:
 *           description: Failed to provide required input parameters.
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
router.post('/', postNewUser);


export default router;
