import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';
import * as validate from '../middleware/validate.js';

const router = express.Router();

/*
router.post('/signup', validate.signup, authController.signUp);
router.post('/login', authController.login);
router.get('/verify-account/:verifyToken', authController.verifyAccount);

router.post(
  '/forgot-password',
  validate.forgotPassword,
  authController.forgotPassword
);

router.post(
  '/reset-password/:resetToken',
  validate.resetPassword,
  authController.resetPassword
);
*/

router.post(
  '/login-by-email',
  validate.loginByEmail,
  authController.loginByEmail
);

router.post(
  '/login-by-mobile',
  validate.loginByMobile,
  authController.loginByEmail
);

router.post('/verify-email', validate.verifyEmail, authController.verifyEmail);

router.post(
  '/update-profile',
  validate.updateProfile,
  authController.protect,
  authController.updateProfile
);

router.get(
  '/users',
  authController.protect,
  authController.allowedTo('admin'),
  userController.getAllUsers
);

export default router;
