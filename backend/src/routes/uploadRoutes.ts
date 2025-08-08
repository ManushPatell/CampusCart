import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController"; // You'll write this next

const router = express.Router();

// Multer middleware to handle multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image to AWS S3
 *     description: Accepts a single image file and uploads it to an S3 bucket. Returns the public URL of the uploaded image.
 *     tags:
 *       - Image Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 url:
 *                   type: string
 *                   example: https://your-bucket-name.s3.your-region.amazonaws.com/rentals/example.jpg
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No file uploaded.
 *       500:
 *         description: Upload failed due to a server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Upload failed
 *                 details:
 *                   type: string
 *                   example: Error message details
 */
router.post("/", upload.single("image"), uploadImage);






export default router;
