import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { signUp, login, verifyAccount } from '../controllers/authController.js';
import { signupValidation } from '../middleware/validation.js';

const router = express.Router();

router.post('/signup', signupValidation, signUp);
router.post('/login', login);
router.get('/verify-account/:verifyToken', verifyAccount);

router.get('/get-all-users', getAllUsers);

export default router;
