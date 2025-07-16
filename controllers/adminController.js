// server/controllers/adminController.js
import User from '../models/User.js';
import Image from '../models/Image.js';// ✅✅✅ 이미지 업로드 컨트롤러

export const getDashboardStats = async (req, res) => {
  const userCount = await User.countDocuments();
  res.json({ userCount });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({}, '-password'); // 비밀번호 제외
  res.json(users);
};

// ✅✅✅ 이미지 업로드 컨트롤러
export const uploadImage = async (req, res) => {
  try {
    const url = req.file?.path;
    const public_id = req.file?.filename; // Cloudinary가 생성한 ID

    const newImage = new Image({
      url,
      public_id,
      uploadedBy: req.user?.id, // 인증된 사용자 ID (isAuth로부터)
    });

    await newImage.save();

    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: '이미지 업로드 실패' });
  }
};

// ✅✅✅ 이미지 목록 불러오기 컨트롤러
export const getImages = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'admin-uploads/',
      max_results: 30,
    });
    res.json(result.resources); // 배열 반환
  } catch (err) {
    res.status(500).json({ error: 'Cloudinary 이미지 조회 실패' });
  }
};