import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";
import prisma from "../lib/prisma";

export async function login(req: Request, res: Response): Promise<void> {
  const admin = await prisma.admin.findUnique({
    where: { email: req.body.email.toLowerCase() },
  });
  if (
    !admin ||
    !(await bcrypt.compare(req.body.password, admin.passwordHash))
  ) {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
    return;
  }
  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] },
  );
  res.json({
    success: true,
    data: {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        displayName: admin.displayName,
      },
    },
  });
}
export async function me(req: Request, res: Response): Promise<void> {
  const admin = await prisma.admin.findUnique({
    where: { id: (req as Request & { adminId?: number }).adminId },
  });
  res.json({
    success: true,
    data: admin && {
      id: admin.id,
      email: admin.email,
      displayName: admin.displayName,
    },
  });
}
