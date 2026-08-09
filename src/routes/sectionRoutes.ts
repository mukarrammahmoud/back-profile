import { Router } from "express";
import {
  adminSections,
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "../controllers/sectionController";
import { requireAuth } from "../middleware/auth";
import { idParam, validate } from "../middleware/validate";
import { sectionSchema } from "../schemas";
const router = Router();
router.get("/", getSections);
router.get("/admin/all", requireAuth, adminSections);
router.post("/", requireAuth, validate(sectionSchema), createSection);
router.put(
  "/:id",
  requireAuth,
  validate(idParam, "params"),
  validate(sectionSchema),
  updateSection,
);
router.delete("/:id", requireAuth, validate(idParam, "params"), deleteSection);
export default router;
