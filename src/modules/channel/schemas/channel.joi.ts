import * as Joi from 'joi'

export const CreateChannelJoi = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(24).required(),
  purpose: Joi.string().min(3).max(128),
  private: Joi.boolean()
})

export const UpdateChannelJoi = Joi.object().keys({
  id: Joi.number(),
  name: Joi.string().alphanum().min(3).max(24),
  purpose: Joi.string().allow('').min(3).max(128),
  private: Joi.boolean().optional()
})

export const DeleteChannelJoi = Joi.object().keys({
  id: Joi.number()
})

export const FavoriteChannelJoi = Joi.object().keys({
  id: Joi.number()
})