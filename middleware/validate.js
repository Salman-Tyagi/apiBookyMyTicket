import { Joi, celebrate } from 'celebrate';

export const signup = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().min(2).max(30).message('Provide name'),
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

// Movie
export const createMovie = celebrate({
  body: Joi.object({
    title: Joi.string().required().min(2).max(100).trim().message('TITLE'),
    images: Joi.array().items(Joi.string()).required(),
    video: Joi.string().min(2).max(50).trim().message('VIDEO'),
    rating: Joi.number().required().min(1).max(10).default(4.5),
    review: Joi.string().required().min(5).max(50).trim().message('REVIEW'),
    votes: Joi.number().required().integer().message('VOTES'),
    screenType: Joi.array().items(Joi.string()).required(),
    language: Joi.array().items(Joi.string()).required(),
    genre: Joi.array().items(Joi.string()).required(),
    duration: Joi.number().required().integer().max(240).message('DURATION'),
    certification: Joi.string().required(),
    releaseDate: Joi.date().required(),
    about: Joi.string().required().min(10).max(200).trim().message('ABOUT'),
    cast: Joi.object().pattern(Joi.string(), Joi.string()).required(),
  }),
});

// Cinema
export const createCinema = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(60).trim().message('cinemaName'),
    type: Joi.string().required().min(2).max(15).trim().message('cinemaType'),
    location: Joi.string().required().min(2).max(50).trim().message('location'),
    state: Joi.string().required().min(2).max(30).trim().message('state'),
  }),
});
