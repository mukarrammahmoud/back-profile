import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/profile
 * Returns the first (and only) profile record.
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      res.status(404).json({ success: false, message: "Profile not found." });
      return;
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("[getProfile] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * PUT /api/profile
 * Updates the existing profile record.
 */
export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const existing = await prisma.profile.findFirst();
    const profile = existing
      ? await prisma.profile.update({
          where: { id: existing.id },
          data: req.body,
        })
      : await prisma.profile.create({ data: req.body });

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("[updateProfile] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
