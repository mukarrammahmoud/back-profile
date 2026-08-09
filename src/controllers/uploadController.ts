import { Request, Response } from "express";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { env, uploadDir } from "../config";
import prisma from "../lib/prisma";
export async function upload(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ success: false, message: "File is required." });
    return;
  }
  await fs.mkdir(uploadDir, { recursive: true });
  const filename = `${crypto.randomUUID()}${path.extname(req.file.originalname)}`;
  await fs.writeFile(path.join(uploadDir, filename), req.file.buffer);
  const url = `${env.APP_URL}/uploads/${filename}`;
  const asset = await prisma.mediaAsset.create({
    data: {
      filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url,
    },
  });
  res.status(201).json({ success: true, data: asset });
}
