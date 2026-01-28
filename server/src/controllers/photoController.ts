import { Request, Response } from "express";
import s3 from "../config/s3";
import { prisma } from "../config/prisma";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const fileExtension = req.file.originalname.split(".").pop();
    const s3Key = `${userId}/${uuidv4()}.${fileExtension}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const webUrl = `${process.env.CLOUDFRONT_URL}/${s3Key}`;
    const photo = await prisma.photo.create({
      data: {
        title: title || "Untitled",
        s3Key: s3Key,
        webUrl: webUrl,
        userId: userId,
      },
    });

    return res
      .status(201)
      .json({ message: "File uploaded successfully", photo });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Failed to upload file" });
  }
};

export const getPhotos = async (req: Request, res: Response): Promise<any> => {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};
