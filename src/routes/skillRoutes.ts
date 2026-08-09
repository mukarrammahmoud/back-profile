import { Router } from "express";
import {
  createSkill,
  deleteSkill,
  getSkillById,
  getSkills,
  updateSkill,
} from "../controllers/skillController";
import { requireAuth } from "../middleware/auth";
import { idParam, validate } from "../middleware/validate";
import { skillSchema } from "../schemas";
const router = Router();
router.get("/", getSkills);
router.get("/:id", validate(idParam, "params"), getSkillById);
router.post("/", requireAuth, validate(skillSchema), createSkill);
router.put(
  "/:id",
  requireAuth,
  validate(idParam, "params"),
  validate(skillSchema),
  updateSkill,
);
router.delete("/:id", requireAuth, validate(idParam, "params"), deleteSkill);
export default router;
