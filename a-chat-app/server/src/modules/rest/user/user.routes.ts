import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../../middlewares/rest/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.registerZodSchema),
  UserController.register
);

router.post('/login', validateRequest(UserValidation.loginZodSchema), UserController.login);

export const UserRoutes = router;
