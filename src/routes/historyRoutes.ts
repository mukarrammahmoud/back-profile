import { Router } from 'express';
import {
    getHistory,
    getHistoryById,
    createHistory,
    updateHistory,
    deleteHistory,
} from '../controllers/historyController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: History
 *   description: Work experience and education history
 */

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get all history entries
 *     tags: [History]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [work, education]
 *         description: Filter by type
 *     responses:
 *       200:
 *         description: List of history entries (current first, then sorted by date desc)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/History'
 */
router.get('/', getHistory);

/**
 * @swagger
 * /api/history/{id}:
 *   get:
 *     summary: Get a history entry by ID
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History entry ID
 *     responses:
 *       200:
 *         description: History entry found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/History'
 *       404:
 *         description: History entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getHistoryById);

/**
 * @swagger
 * /api/history:
 *   post:
 *     summary: Create a new history entry
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoryInput'
 *     responses:
 *       201:
 *         description: History entry created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/History'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createHistory);

/**
 * @swagger
 * /api/history/{id}:
 *   put:
 *     summary: Update a history entry
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoryInput'
 *     responses:
 *       200:
 *         description: History entry updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/History'
 *       404:
 *         description: History entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateHistory);

/**
 * @swagger
 * /api/history/{id}:
 *   delete:
 *     summary: Delete a history entry
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: History entry ID
 *     responses:
 *       200:
 *         description: History entry deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'History entry deleted successfully.' }
 *       404:
 *         description: History entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteHistory);

export default router;

