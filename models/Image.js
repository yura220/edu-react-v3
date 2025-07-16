// server/models/Image.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 업로더 추적 (선택사항)
    },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', imageSchema);
export default Image;