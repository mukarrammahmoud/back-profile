import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/contact
 * Returns all contact messages. Pass ?unread=true to filter unread only.
 */
export const getMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { unread, page = "1", limit = "20" } = req.query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const where = unread === "true" ? { isRead: false } : {};

    const [messages, total] = await prisma.$transaction([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: messages,
      meta: {
        page: currentPage,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("[getMessages] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * GET /api/contact/:id
 * Returns a single contact message by ID.
 */
export const getMessageById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid message ID." });
      return;
    }

    const message = await prisma.contactMessage.findUnique({ where: { id } });

    if (!message) {
      res.status(404).json({ success: false, message: "Message not found." });
      return;
    }

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error("[getMessageById] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * POST /api/contact
 * Creates a new contact message (public endpoint — no auth needed).
 */
export const createMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newMessage = await prisma.contactMessage.create({ data: req.body });

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("[createMessage] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * PATCH /api/contact/:id/read
 * Marks a contact message as read.
 */
export const markAsRead = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid message ID." });
      return;
    }

    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Message not found." });
      return;
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error("[markAsRead] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * DELETE /api/contact/:id
 * Deletes a contact message by ID.
 */
export const deleteMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid message ID." });
      return;
    }

    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Message not found." });
      return;
    }

    await prisma.contactMessage.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("[deleteMessage] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
