import { Request, Response } from "express";
import prisma from "../lib/prisma";
export async function getSettings(req: Request, res: Response): Promise<void> {
  const data = await prisma.portfolioSettings.findUnique({ where: { id: 1 } });
  res.json({ success: true, data });
}
export async function updateSettings(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await prisma.portfolioSettings.upsert({
    where: { id: 1 },
    create: { id: 1, ...req.body },
    update: req.body,
  });
  res.json({ success: true, data });
}
