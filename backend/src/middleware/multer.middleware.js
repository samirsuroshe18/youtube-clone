import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), './public/temp'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();  // Generate a unique suffix using timestamp
    const extension = file.originalname.split('.').pop();  // Get the file extension
    const baseName = file.originalname.split('.').slice(0, -1).join('.'); // Get the original file name without the extension
    cb(null, `${baseName}-${uniqueSuffix}.${extension}`)
  }
})

export const upload = multer({ storage });
// export const upload = multer({ storage : storage });
