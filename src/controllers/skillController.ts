import { Request, Response } from 'express';
import prisma from '../lib/prisma';

/**
 * GET /api/skills
 * Returns all skills. Pass ?category=Frontend to filter by category.
 */
export const getSkills = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.query;

        const skills = await prisma.skill.findMany({
            where: category ? { category: String(category) } : undefined,
            orderBy: { name: 'asc' },
        });

        res.status(200).json({ success: true, data: skills });
    } catch (error) {
        console.error('[getSkills] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * GET /api/skills/:id
 * Returns a single skill by ID.
 */
export const getSkillById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid skill ID.' });
            return;
        }

        const skill = await prisma.skill.findUnique({ where: { id } });

        if (!skill) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }

        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        console.error('[getSkillById] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * POST /api/skills
 * Creates a new skill.
 */
export const createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, category, proficiencyLevel, iconUrl } = req.body;

        if (!name) {
            res.status(400).json({ success: false, message: 'Name is required.' });
            return;
        }

        const skill = await prisma.skill.create({
            data: { name, category, proficiencyLevel, iconUrl },
        });

        res.status(201).json({ success: true, data: skill });
    } catch (error) {
        console.error('[createSkill] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * PUT /api/skills/:id
 * Updates an existing skill.
 */
export const updateSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid skill ID.' });
            return;
        }

        const existing = await prisma.skill.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }

        const { name, category, proficiencyLevel, iconUrl } = req.body;

        const skill = await prisma.skill.update({
            where: { id },
            data: { name, category, proficiencyLevel, iconUrl },
        });

        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        console.error('[updateSkill] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

/**
 * DELETE /api/skills/:id
 * Deletes a skill by ID.
 */
export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id));

        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid skill ID.' });
            return;
        }

        const existing = await prisma.skill.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: 'Skill not found.' });
            return;
        }

        await prisma.skill.delete({ where: { id } });

        res.status(200).json({ success: true, message: 'Skill deleted successfully.' });
    } catch (error) {
        console.error('[deleteSkill] Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
