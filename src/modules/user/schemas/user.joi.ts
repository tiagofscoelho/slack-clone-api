import * as Joi from 'joi'

export const CreateUserJoi = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(64).required(),
  lastName: Joi.string().alphanum().min(3).max(64),
  email: Joi.string().min(3).max(128).required(),
  password: Joi.string().alphanum().min(3).max(128).required()
})