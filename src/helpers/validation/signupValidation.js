/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const signUpValidationSchema = Joi.object().keys({
  firstName: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30)
    .error((errors) => ({
      message: 'firstname must be alphabetics character and a minimum of 3 character and max of 30'
    })),
  lastName: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30)
    .error((errors) => ({
      message: 'lastname must be alphabetics character and a minimum of 3 character and max of 30'
    })),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,}$/)
    .error((errors) => ({
      message: 'Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character'
    })),
  email: Joi.string().email()
    .error((errors) => ({
      message: 'Your email is not valid'
    }))
});


export const validateData = (data, schema) => {
  const { error, value } = Joi.validate(data, schema);
  const values = { error, value };
  return values;
};


export const signInValidationSchema = Joi.object().keys({
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,}$/)
    .error((errors) => ({
      message: 'Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character'
    })),
  email: Joi.string().email()
    .error((errors) => ({
      message: 'Your email is not valid'
    }))
});

export const validateSignInData = (data, schema) => {
  const { error, value } = Joi.validate(data, schema);
  const values = { error, value };
  return values;
};
