import multer from 'multer';

// To store the image in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  //   To rename uploaded image
  filename: function (req, file, cb) {
    const suffix = Date.now();
    const imageName = `${file.originalname.split('.')[0]}${suffix}.${
      file.originalname.split('.')[1]
    }`;
    cb('', imageName);
  },
});

// Document type must be image
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/png')
    return cb(
      {
        status: 'fail',
        statusCode: 400,
        message: 'File not supported, only .jpg, .jpeg, .png allowed',
      },
      false
    );

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
