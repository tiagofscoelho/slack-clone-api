import * as Joi from 'joi'

export const CreateChannelJoi = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(24).required(),
  purpose: Joi.string().min(3).max(128),
  private: Joi.boolean()
})

export const UpdateChannelJoi = Joi.object().keys({
  id: Joi.number(),
  name: Joi.string().alphanum().min(3).max(24).optional(),
  purpose: Joi.string().min(3).max(128).optional(),
  private: Joi.boolean().optional()
})