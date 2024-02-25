import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';
import * as validate from '../middleware/validate.js';

const router = express.Router();

// router.post('/signup', signupValidation, signUp);
// router.post('/login', login);
// router.get('/verify-account/:verifyToken', verifyAccount);

router.post(
  '/login-by-email',
  validate.loginByEmail,
  authController.loginByEmail
);

router.post('/verify-email', validate.verifyEmail, authController.verifyEmail);

router.post(
  '/update-profile',
  validate.updateProfile,
  authController.updateProfile
);

router.get('/users', getAllUsers);

export default router;
