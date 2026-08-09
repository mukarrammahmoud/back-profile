import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

export type AuthRequest = Request & { adminId?: number };

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Authentication required." });
    return;
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { adminId: number };
    req.adminId = payload.adminId;
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
}
