import express from 'express';
import { login, signup, logout, checkAuth } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/protect.middleware.js';

const router = express.Router();

router.get('/check-auth', protect, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protect, logout);

export default router;