import multer from 'multer';

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1 - min);

// To store the image in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  //   To rename uploaded image
  filename: function (req, file, cb) {
    const suffix = Date.now();
    const fileName = `${file.originalname.split('.')[0]}-${suffix}-${randomNum(
      0,
      1001
    )}.${file.originalname.split('.')[1]}`;
    console.log(fileName);

    cb(null, fileName);
  },
});

// Document type must be image
const fileFilter = (req, file, cb) => {
  console.log(file);
  if (!file.mimetype.startsWith('image')) {
    return cb(
      {
        status: 'fail',
        statusCode: 400,
        message: 'File not supported, only .jpg, .jpeg, .png images allowed',
      },
      false
    );
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
