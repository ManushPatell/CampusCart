import express from 'express';

import { getUserById, getAllUsers, postNewUser } from '../controllers/userController.ts';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.post('/', postNewUser)

export default router;
