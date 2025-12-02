const Joi = require('joi');

exports.userSchema = Joi.object({
  username: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(), // optional on updates
  role: Joi.string().valid('customer','admin').optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});
