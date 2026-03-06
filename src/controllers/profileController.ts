import { Request, Response } from 'express';
import prisma from '../lib/prisma';

/**
 * GET /api/profile
 * Returns the first profile record from the database.
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile = await prisma.profile.findFirst();

        if (!profile) {
            res.status(404).json({
                success: false,
                message: 'Profile not found.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        console.error('[getProfile] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};
