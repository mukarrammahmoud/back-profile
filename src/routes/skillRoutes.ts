import { Router } from 'express';
import {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
} from '../controllers/skillController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Developer skills management
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (e.g. Frontend, Backend, DevOps)
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Skill'
 */
router.get('/', getSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getSkillById);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       201:
 *         description: Skill created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Skill'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       200:
 *         description: Skill updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'Skill deleted successfully.' }
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteSkill);

export default router;

