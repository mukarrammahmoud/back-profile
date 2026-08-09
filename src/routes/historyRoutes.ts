import { Router } from "express";
import {
  createHistory,
  deleteHistory,
  getHistory,
  getHistoryById,
  updateHistory,
} from "../controllers/historyController";
import { requireAuth } from "../middleware/auth";
import { idParam, validate } from "../middleware/validate";
import { historySchema } from "../schemas";
const router = Router();
router.get("/", getHistory);
router.get("/:id", validate(idParam, "params"), getHistoryById);
router.post("/", requireAuth, validate(historySchema), createHistory);
router.put(
  "/:id",
  requireAuth,
  validate(idParam, "params"),
  validate(historySchema),
  updateHistory,
);
router.delete("/:id", requireAuth, validate(idParam, "params"), deleteHistory);
export default router;
