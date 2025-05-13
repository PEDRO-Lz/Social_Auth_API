import express from 'express';
import { login, cadastro, getCurrentUserData, updateUserTwitterData, updateUserYoutubeData } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
import { redirectToTwitterAuth, handleTwitterCallback, healthCheck } from '../controllers/twitterController.js';
import { redirectToGoogleAuth, handleGoogleCallback, getYoutubeDataFromSession } from '../controllers/googleController.js';

const router = express.Router();

// Rotas públicas
router.post('/login', login);
router.post('/cadastro', cadastro);

// Rotas protegidas
router.get('/me', auth, getCurrentUserData);
router.put('/update-twitter', auth, updateUserTwitterData);
router.put('/update-youtube', auth, updateUserYoutubeData);

// Rotas do Twitter
router.get('/twitter', redirectToTwitterAuth);
router.get('/twitter/callback', handleTwitterCallback);
router.get('/twitter/health', healthCheck);

// Rotas do Google/YouTube
router.get('/google', redirectToGoogleAuth);
router.get('/google/callback', handleGoogleCallback);
router.get('/youtube/session-data', getYoutubeDataFromSession);

export default router;
