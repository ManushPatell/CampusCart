import express from 'express';
import {
  deleteLogoutUser,
  postLoginUser,
  postRefreshToken,
} from '../controllers/authController.ts';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user.
 *     tags: [auth]
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
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
router.post('/login', postLoginUser);
router.post('/token', postRefreshToken);
router.delete('/logout', deleteLogoutUser);

export default router;
