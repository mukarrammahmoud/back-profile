import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/history
 * Returns all history entries. Pass ?type=work or ?type=education to filter.
 */
export const getHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { type } = req.query;

    const history = await prisma.history.findMany({
      where: { isVisible: true, ...(type ? { type: String(type) } : {}) },
      orderBy: [
        { sortOrder: "asc" },
        { isCurrent: "desc" },
        { startDate: "desc" },
      ],
    });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("[getHistory] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * GET /api/history/:id
 * Returns a single history entry by ID.
 */
export const getHistoryById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid history ID." });
      return;
    }

    const entry = await prisma.history.findFirst({
      where: { id, isVisible: true },
    });

    if (!entry) {
      res
        .status(404)
        .json({ success: false, message: "History entry not found." });
      return;
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error("[getHistoryById] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * POST /api/history
 * Creates a new history entry.
 */
export const createHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const entry = await prisma.history.create({ data: req.body });

    res.status(201).json({ success: true, data: entry });
  } catch (error) {
    console.error("[createHistory] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * PUT /api/history/:id
 * Updates an existing history entry.
 */
export const updateHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid history ID." });
      return;
    }

    const existing = await prisma.history.findUnique({ where: { id } });
    if (!existing) {
      res
        .status(404)
        .json({ success: false, message: "History entry not found." });
      return;
    }

    const entry = await prisma.history.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    console.error("[updateHistory] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * DELETE /api/history/:id
 * Deletes a history entry by ID.
 */
export const deleteHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid history ID." });
      return;
    }

    const existing = await prisma.history.findUnique({ where: { id } });
    if (!existing) {
      res
        .status(404)
        .json({ success: false, message: "History entry not found." });
      return;
    }

    await prisma.history.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "History entry deleted successfully." });
  } catch (error) {
    console.error("[deleteHistory] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
