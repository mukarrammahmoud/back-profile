import { Router } from 'express';
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController';

const router = Router();

router.get('/', getProjects);           // GET    /api/projects
router.get('/:id', getProjectById);     // GET    /api/projects/:id
router.post('/', createProject);        // POST   /api/projects
router.put('/:id', updateProject);      // PUT    /api/projects/:id
router.delete('/:id', deleteProject);   // DELETE /api/projects/:id

export default router;
