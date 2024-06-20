import express from 'express';
import { UserControllers } from './UserControllers';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './UserValidation';



const router = express.Router();

router.post('/signup', validateRequest(UserValidation.userValidationSchema), UserControllers.signUpUser );

router.post('/login', validateRequest(UserValidation.loginValidationSchema), UserControllers.loginUser);



export const UserRoutes = router;