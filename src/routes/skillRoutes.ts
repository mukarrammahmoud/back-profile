import { Router } from 'express';
import {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
} from '../controllers/skillController';

const router = Router();

router.get('/', getSkills);         // GET    /api/skills
router.get('/:id', getSkillById);   // GET    /api/skills/:id
router.post('/', createSkill);      // POST   /api/skills
router.put('/:id', updateSkill);    // PUT    /api/skills/:id
router.delete('/:id', deleteSkill); // DELETE /api/skills/:id

export default router;
