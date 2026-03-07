import { Router } from 'express';
import {
    getMessages,
    getMessageById,
    createMessage,
    markAsRead,
    deleteMessage,
} from '../controllers/contactController';

const router = Router();

router.get('/', getMessages);               // GET    /api/contact
router.get('/:id', getMessageById);         // GET    /api/contact/:id
router.post('/', createMessage);            // POST   /api/contact
router.patch('/:id/read', markAsRead);      // PATCH  /api/contact/:id/read
router.delete('/:id', deleteMessage);       // DELETE /api/contact/:id

export default router;
