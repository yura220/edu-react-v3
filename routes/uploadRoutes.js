// server/routes/uploadRoutes.js
import express from 'express';
import upload from '../middlewares/cloudinaryUploader.js';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ url: req.file.path });
});

export default router;