import { Joi, celebrate } from 'celebrate';

export const signup = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().min(2).max(30).label('Provide name'),
    email: Joi.string()
      .required()
      .trim()
      .email()
      .message('Invalid email address'),
    password: Joi.string().required().min(4).max(30),
    confirmPassword: Joi.ref('password'),
  }),
});

export const forgotPassword = celebrate({
  body: Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .email()
      .message('Invalid email address'),
  }),
});

export const resetPassword = celebrate({
  body: Joi.object({
    password: Joi.string().required().min(6).max(30).message('PASSWORD'),
    confirmPassword: Joi.ref('password'),
  }),
});

export const loginByEmail = celebrate({
  body: Joi.object({
    email: Joi.string().required().email().message('Invalid email address'),
  }),
});

export const verifyEmail = celebrate({
  body: Joi.object({
    email: Joi.string().required().email().message('Invalid email address'),
    OTP: Joi.number()
      .required()
      .integer()
      .message('Provide 4 digit number only'),
  }),
});

export const loginByMobile = celebrate({
  body: Joi.object({
    mobileNumber: Joi.number().integer().required().min(10).label('Mobile'),
  }),
});

export const updateProfile = celebrate({
  body: Joi.object({
    email: Joi.string().email().message('Invalid email address'),
    mobileNumber: Joi.number()
      .integer()
      .min(10)
      .max(10)
      .message('Invalid mobile number'),
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    birthday: Joi.date(),
    identity: Joi.string().min(2).max(30),
    married: Joi.boolean(),
    pincode: Joi.number().min(4).max(6),
    address: Joi.string().min(2).max(60),
    landmark: Joi.string().min(2).max(30),
    city: Joi.string().min(2).max(30),
    state: Joi.string().min(2).max(30),
  }),
});

export const createMovie = celebrate({
  body: Joi.object({
    title: Joi.string().required().min(2).max(100).trim().label('Title'),
    images: Joi.array().items(Joi.string()).label('Images'),
    video: Joi.string().min(2).max(50).trim().label('Video'),
    rating: Joi.number().required().min(1).max(10).default(4.5),
    review: Joi.string().required().min(5).max(50).trim().label('Review'),
    votes: Joi.number().required().label('Votes'),
    screen: Joi.array()
      .items(Joi.string().valid('2d', '3d', '4dx', 'mx4d', 'imax 2d'))
      .required()
      .label('Screen'),
    language: Joi.array().items(Joi.string()).required(),
    genre: Joi.array().items(Joi.string()).required(),
    duration: Joi.number().required().integer().max(240).label('Duration'),
    certification: Joi.string().required(),
    releaseDate: Joi.date().required(),
    about: Joi.string().required().min(10).max(500).trim().label('About'),
    cast: Joi.object()
      .pattern(Joi.string(), Joi.array().items(Joi.string()))
      .required()
      .label('Cast'),
  }),
});

export const createCinema = celebrate({
  body: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(60)
      .trim()
      .required()
      .label('Name'),
    type: Joi.string()
      .required()
      .min(2)
      .max(15)
      .trim()
      .required()
      .label('Type'),
    screen: Joi.array().items(Joi.string()).required().label('Screen'),
    facilities: Joi.object()
      .pattern(Joi.string(), Joi.boolean())
      .required()
      .label('Facilities'),
    timing: Joi.array().items(Joi.string()).label('Timing'),
    seats: Joi.object().pattern(Joi.string(), Joi.array()).label('Seats'),
    location: Joi.string()
      .required()
      .min(2)
      .max(50)
      .trim()
      .required()
      .label('Location'),
    address: Joi.string()
      .required()
      .min(2)
      .max(140)
      .trim()
      .required()
      .label('Address'),
    state: Joi.string()
      .required()
      .min(2)
      .max(30)
      .trim()
      .required()
      .label('State'),
  }),
});

export const createUpdateRating = celebrate({
  body: Joi.object({
    rating: Joi.number().integer().required().min(1).max(10).label('Rating'),
    review: Joi.string().required().min(4).max(100).trim().label('Review'),
  }),
});
