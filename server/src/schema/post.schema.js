import { Joi } from "celebrate";

export const addPostSchema = Joi.object({
  photo_url: Joi.string().required(),
  caption: Joi.string().required()
});
