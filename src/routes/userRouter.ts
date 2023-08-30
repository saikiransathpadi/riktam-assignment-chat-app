import { Router } from 'express';
import { getUser, searchUsers, userLogin, createUser, updateUser, userLogout } from '../controller/usersController';
import { authenticatedRouter, checkIfAdmin } from '../middleware/auth';
import { signUpValidation } from '../validations/users';

const userRouter = Router();

userRouter.post('create', authenticatedRouter, checkIfAdmin, signUpValidation, createUser);
userRouter.post('update/:user_id', authenticatedRouter, checkIfAdmin, signUpValidation, updateUser);
userRouter.post('/login', userLogin);
userRouter.post('/logout',authenticatedRouter, userLogout);
userRouter.get('/search', authenticatedRouter, searchUsers);
userRouter.get('/', authenticatedRouter, getUser);
userRouter.post('/test/create', signUpValidation, createUser);

export default userRouter;
