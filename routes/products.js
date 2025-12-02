const express = require('express');
const router = express.Router();
const products = require('../controllers/productsController');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/authMiddleware');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().required().min(0),
  sku: Joi.string().optional(),
  stock: Joi.number().integer().min(0).optional(),
  categories: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(Joi.string().uri()).optional()
});

router.get('/', products.getAll); // public read
router.get('/:id', products.getById); // public read

// protected create/update/delete
router.post('/', auth, validate(productSchema), products.create);
router.put('/:id', auth, validate(productSchema), products.update);
router.delete('/:id', auth, products.remove);

module.exports = router;
