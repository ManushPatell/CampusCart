import { Request, Response } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.file;
  const fileName = `${uuidv4()}-${file.originalname}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };
  console.log("Upload Params:", uploadParams);

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    res.status(200).json({ message: "File uploaded successfully", url: fileUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: (err as Error).message });
  }
};
