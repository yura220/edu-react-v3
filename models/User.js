// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',  // 🔴 로그인 응답 및 JWT에 포함됨
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ 잘린 부분 수정
const User = mongoose.model('User', userSchema);
export default User;
