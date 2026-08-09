import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  markAsRead,
} from "../controllers/contactController";
import { requireAuth } from "../middleware/auth";
import { idParam, validate } from "../middleware/validate";
import { contactSchema } from "../schemas";
const router = Router();
const contactLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
});
router.get("/", requireAuth, getMessages);
router.get("/:id", requireAuth, validate(idParam, "params"), getMessageById);
router.post("/", contactLimit, validate(contactSchema), createMessage);
router.patch("/:id/read", requireAuth, validate(idParam, "params"), markAsRead);
router.delete("/:id", requireAuth, validate(idParam, "params"), deleteMessage);
export default router;
