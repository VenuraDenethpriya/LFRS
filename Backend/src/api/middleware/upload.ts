import multer from 'multer';
import { storage } from '../../config/cloudinary';

export const upload = multer({ storage });