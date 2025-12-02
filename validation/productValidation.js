const Joi = require('joi');

exports.productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().precision(2).min(0).required(),
  sku: Joi.string().optional().allow(''),
  stock: Joi.number().integer().min(0).optional(),
  categories: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(Joi.string()).required(),
});
