// src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dlccif9no',
  api_key: '619821217968725',
  api_secret: 'bzUVLyKYy4BZ10N6WWcZl3SCZ-o',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'lfrs_reports',
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    };
  },
});

export { cloudinary, storage };
