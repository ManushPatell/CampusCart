import express from 'express';
import {
  deleteLogoutUser,
  postLoginUser,
  postRefreshToken,
} from '../controllers/authController.ts';
import { authenticateToken } from '../middleware/authMiddleware.ts';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user.
 *     tags: [Auth]
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
 *       401:
 *           description: Invalid login credentials.
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

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Generates a refresh token.
 *     tags: [Auth]
 *     requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *     responses:
 *       200:
 *             description: Login successful.
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: string
 *
 *       401:
 *             description: No token provided or token not in database.
 *             content:
 *                 application/json:
 *                     schema:
 *                     type: object
 *                     properties:
 *                         error:
 *                             type: string
 *       403:
 *           description: Invalid refresh token.
 *           content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  error:
 *                      type: string
 */
router.post('/token', authenticateToken, postRefreshToken);
router.delete('/logout', authenticateToken, deleteLogoutUser);

export default router;
