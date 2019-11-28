import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/__mocks__/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

export const uploadSingleImage = (fileName) => upload.single(fileName);
export const uploadMultipleImages = (fileName) => upload.array(fileName);
