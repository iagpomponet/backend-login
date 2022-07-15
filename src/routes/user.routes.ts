import express from 'express';

import checkAuth from '../middleware/auth';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { GetAllUsersController } from '../modules/users/useCases/getAllUsers/GetAllUserController';

//controllers 
const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();


const router = express.Router();

router.get('/', getAllUsersController.handle);
router.post('/signup', createUserController.handle);


export default router;
