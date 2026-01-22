import { Router } from "express";
import { uploadPhoto, getPhotos } from "../controllers/photoController";
import upload from "../middleware/upload";

const router = Router();

router.post("/upload", upload.single("image"), uploadPhoto);
router.get("/", getPhotos);

export default router;
