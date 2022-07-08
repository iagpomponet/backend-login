import express from 'express';

import checkAuth from '../middleware/auth';
import { createUserController } from '../modules/users/useCases/createUser';
import { getAllUsersController } from '../modules/users/useCases/getAllUsers';




const router = express.Router();

router.get('/',  (req, res) => getAllUsersController.handle(req, res));
router.post('/signup', (req, res) => createUserController.handle(req, res));


export default router;
