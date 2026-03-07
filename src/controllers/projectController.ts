import { Request, Response } from 'express';
import prisma from '../lib/prisma';

/**
 * GET /api/projects
 * Returns all projects. Pass ?featured=true to filter only featured ones.
 */
export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const { featured } = req.query;

        const projects = await prisma.project.findMany({
            where: featured === 'true' ? { isFeatured: true } : undefined,
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error('[getProjects] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * GET /api/projects/:id
 * Returns a single project by ID.
 */
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid project ID.' });
            return;
        }

        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error('[getProjectById] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * POST /api/projects
 * Creates a new project.
 */
export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, imageUrl, technologies, demoUrl, repoUrl, isFeatured } = req.body;

        if (!title) {
            res.status(400).json({ success: false, message: 'Title is required.' });
            return;
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                imageUrl,
                technologies: technologies ?? [],
                demoUrl,
                repoUrl,
                isFeatured: isFeatured ?? false,
            },
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error('[createProject] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * PUT /api/projects/:id
 * Updates an existing project.
 */
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid project ID.' });
            return;
        }

        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }

        const { title, description, imageUrl, technologies, demoUrl, repoUrl, isFeatured } = req.body;

        const project = await prisma.project.update({
            where: { id },
            data: { title, description, imageUrl, technologies, demoUrl, repoUrl, isFeatured },
        });

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error('[updateProject] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * DELETE /api/projects/:id
 * Deletes a project by ID.
 */
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid project ID.' });
            return;
        }

        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Project not found.' });
            return;
        }

        await prisma.project.delete({ where: { id } });

        res.status(200).json({ success: true, message: 'Project deleted successfully.' });
    } catch (error) {
        console.error('[deleteProject] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
