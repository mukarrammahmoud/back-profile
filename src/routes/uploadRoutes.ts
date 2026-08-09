import { Router } from "express";
import multer from "multer";
import { env } from "../config";
import { upload } from "../controllers/uploadController";
import { requireAuth } from "../middleware/auth";
const router = Router();
const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);
const middleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.UPLOAD_MAX_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, allowed.has(file.mimetype)),
});
router.post("/", requireAuth, middleware.single("file"), upload);
export default router;
