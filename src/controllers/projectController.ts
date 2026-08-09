import { Request, Response } from "express";
import prisma from "../lib/prisma";

/**
 * GET /api/projects
 * Returns all projects. Pass ?featured=true to filter only featured ones.
 */
export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { featured, page = "1", limit = "12" } = req.query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 12, 1), 100);
    const where = {
      isPublished: true,
      ...(featured === "true" ? { isFeatured: true } : {}),
    };

    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.project.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: projects,
      meta: {
        page: currentPage,
        limit: pageSize,
        total,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("[getProjects] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * GET /api/projects/:id
 * Returns a single project by ID.
 */
export const getProjectById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid project ID." });
      return;
    }

    const project = await prisma.project.findFirst({
      where: { id, isPublished: true },
    });

    if (!project) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("[getProjectById] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * POST /api/projects
 * Creates a new project.
 */
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const project = await prisma.project.create({ data: req.body });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("[createProject] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * PUT /api/projects/:id
 * Updates an existing project.
 */
export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid project ID." });
      return;
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }

    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error("[updateProject] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/**
 * DELETE /api/projects/:id
 * Deletes a project by ID.
 */
export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id));

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid project ID." });
      return;
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }

    await prisma.project.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.error("[deleteProject] Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
