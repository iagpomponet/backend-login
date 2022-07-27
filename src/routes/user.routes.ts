import express from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import checkAuth from '../middleware/auth';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { GetAllUsersController } from '../modules/users/useCases/getAllUsers/GetAllUserController';
import { UploadAvatarController } from '../modules/users/useCases/uploadAvatar/UploadAvatarController';

//controllers 
const createUserController = new CreateUserController();
const getAllUsersController = new GetAllUsersController();
const updateAvatarController = new UploadAvatarController();


const router = express.Router();
const upload = multer(uploadConfig.upload('./tmp/avatar'));

router.get('/', getAllUsersController.handle);
router.post('/signup', createUserController.handle);
router.patch('/avatar', checkAuth, upload.single('avatar'), updateAvatarController.handle);


export default router;
