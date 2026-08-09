import { Request, Response } from "express";
import prisma from "../lib/prisma";
export async function getSections(req: Request, res: Response): Promise<void> {
  const data = await prisma.section.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
  });
  res.json({ success: true, data });
}
export async function adminSections(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await prisma.section.findMany({ orderBy: { sortOrder: "asc" } });
  res.json({ success: true, data });
}
export async function createSection(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await prisma.section.create({ data: req.body });
  res.status(201).json({ success: true, data });
}
export async function updateSection(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await prisma.section.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json({ success: true, data });
}
export async function deleteSection(
  req: Request,
  res: Response,
): Promise<void> {
  await prisma.section.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true, message: "Section deleted successfully." });
}
