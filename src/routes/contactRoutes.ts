import { Router } from 'express';
import {
    getMessages,
    getMessageById,
    createMessage,
    markAsRead,
    deleteMessage,
} from '../controllers/contactController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form messages
 */

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     parameters:
 *       - in: query
 *         name: unread
 *         schema:
 *           type: boolean
 *         description: If true, return only unread messages
 *     responses:
 *       200:
 *         description: List of contact messages (newest first)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContactMessage'
 */
router.get('/', getMessages);

/**
 * @swagger
 * /api/contact/{id}:
 *   get:
 *     summary: Get a contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/ContactMessage'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getMessageById);

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact message (public)
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactMessageInput'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/ContactMessage'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createMessage);

/**
 * @swagger
 * /api/contact/{id}/read:
 *   patch:
 *     summary: Mark a message as read
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/ContactMessage'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id/read', markAsRead);

/**
 * @swagger
 * /api/contact/{id}:
 *   delete:
 *     summary: Delete a contact message
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: 'Message deleted successfully.' }
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteMessage);

export default router;

