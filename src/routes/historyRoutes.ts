import { Router } from 'express';
import {
    getHistory,
    getHistoryById,
    createHistory,
    updateHistory,
    deleteHistory,
} from '../controllers/historyController';

const router = Router();

router.get('/', getHistory);            // GET    /api/history
router.get('/:id', getHistoryById);     // GET    /api/history/:id
router.post('/', createHistory);        // POST   /api/history
router.put('/:id', updateHistory);      // PUT    /api/history/:id
router.delete('/:id', deleteHistory);   // DELETE /api/history/:id

export default router;
