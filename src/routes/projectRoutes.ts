import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers/projectController";
import { requireAuth } from "../middleware/auth";
import { idParam, validate } from "../middleware/validate";
import { projectSchema } from "../schemas";
const router = Router();
router.get("/", getProjects);
router.get("/:id", validate(idParam, "params"), getProjectById);
router.post("/", requireAuth, validate(projectSchema), createProject);
router.put(
  "/:id",
  requireAuth,
  validate(idParam, "params"),
  validate(projectSchema),
  updateProject,
);
router.delete("/:id", requireAuth, validate(idParam, "params"), deleteProject);
export default router;
