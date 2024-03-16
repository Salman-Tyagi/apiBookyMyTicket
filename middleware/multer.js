import multer from 'multer';
import AppError from '../utils/appError.js';

// To add as suffix in uploaded image
const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) - min);

// To store the image in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/posterAndCover');
  },

  // To rename uploaded image
  filename: function (req, file, cb) {
    const suffix = Date.now();
    const fileName = `${file.originalname.split('.')[0]}-${suffix}-${randomNum(
      0,
      1001
    )}.${file.originalname.split('.')[1]}`;

    if (req.body[file.fieldname]) {
      req.body[file.fieldname].push(fileName);
    } else {
      req.body[file.fieldname] = [fileName];
    }

    cb(null, fileName);
  },
});

// Document type must be image
const imageFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(
      new AppError(
        'File not supported, only .jpg, .jpeg, .png images allowed',
        404
      ),
      false
    );
  }

  cb(null, true);
};

// Video filter
const videoFilter = (req, file, cb) => {
  console.log(file);
  if (!file.mimetype.startsWith('video')) {
    return cb(
      {
        status: 'fail',
        statusCode: 400,
        message: 'File not supported, only .mp4 allowed',
      },
      false
    );
  }

  cb(null, true);
};

const uploadImg = multer({
  storage,
  fileFilter: imageFilter,
});

// const uploadVideo = path => {
//   return multer({
//     storage: uploadImgVideo(path),
//     fileFilter: videoFilter,
//   });
// };

export default uploadImg;
