// server/routes/admin.js
import express from 'express';
import {isAuth} from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import upload from '../middlewares/cloudinaryUploader.js'; // ✅✅✅ ← 추가할 부분
import { getDashboardStats, getAllUsers,uploadImage, getImages } from '../controllers/adminController.js';  // ✅✅✅ ← 추가할 부분

const router = express.Router();

router.use(isAuth, isAdmin); // 인증 + 관리자 권한 필수

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.post('/upload-image', upload.single('file'), uploadImage);         // ✅✅✅ ← 추가할 부분
router.get('/images', getImages);                  // ✅✅✅ ← 추가할 부분

export default router;