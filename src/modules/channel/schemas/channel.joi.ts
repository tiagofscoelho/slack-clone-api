import * as Joi from 'joi'

export const CreateChannelJoi = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(64).required(),
  purpose: Joi.string().min(3).max(255),
  private: Joi.boolean()
})