const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/authMiddleware');

// validation
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer','admin').optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});

const userUpdateSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('customer','admin').optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});

router.get('/', auth, users.getAll);         // admin-only in production; for W05 it's protected
router.post('/', auth, validate(userSchema), users.create);
router.get('/:id', auth, users.getById);
router.put('/:id', auth, validate(userUpdateSchema), users.update);
router.delete('/:id', auth, users.remove);

module.exports = router;
