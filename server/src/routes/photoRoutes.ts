import { Router } from "express";
import { uploadPhoto, getPhotos } from "../controllers/photoController";
import upload from "../middleware/upload";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/upload", authMiddleware, upload.single("image"), uploadPhoto);
router.get("/", authMiddleware, getPhotos);

export default router;
