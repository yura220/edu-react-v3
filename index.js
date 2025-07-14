// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';

dotenv.config();

const app = express();

// ✅ CORS 설정
const whitelist = [
  'http://localhost:5173',
  'https://eduai-react-v3-fm.vercel.app'
];
app.use(cors({ origin: whitelist, credentials: true }));

app.use(express.json());

// ✅ 라우터 등록
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);

// ✅ DB 연결 및 서버 실행
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공');
    app.listen(5000, () => {
      console.log('✅ 서버 실행 중: http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ DB 연결 실패:', err));
