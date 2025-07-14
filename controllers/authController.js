// server/controllers/authController.js
import jwt from 'jsonwebtoken'; // ✅✅ 토큰 발급
import User from '../models/User.js';

// ✅ 회원가입 함수
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({ message: '이미 등록된 이메일입니다.' });
  }

  const newUser = new User({ email, password, username });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.status(201).json({
    token,
    user: {
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt // ✅ createdAt 포함
    }
  });

  console.log('🔍 서버 수신 데이터:', req.body);
  console.log("✅ 토큰:", token);
};

// ✅ 로그인 함수
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt // ✅ createdAt 포함
      }
    });
  } catch (err) {
    console.error('❌ 로그인 오류:', err);
    res.status(500).json({ message: '로그인 처리 중 오류 발생' });
  }
};
