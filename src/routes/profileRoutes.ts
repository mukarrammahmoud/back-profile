import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Portfolio owner profile (singleton — one record only)
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/', updateProfile);

export default router;

