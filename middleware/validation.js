import { Joi, celebrate } from 'celebrate';

export const signupValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().trim().min(2).max(30).message('Provide name'),
    email: Joi.string().required().trim().email().message('Invalid email'),
    password: Joi.string().required().min(4).max(30),
    confirmPassword: Joi.ref('password'),
    createdAt: Joi.date().default(Date.now()),
  }),
});
