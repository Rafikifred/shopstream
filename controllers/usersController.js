const User = require('../models/User');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id).select('-password');
    if (!u) return res.status(404).json({ message: 'User not found' });
    res.json(u);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { username, email, password, role, phone, address } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ username, email, password, role, phone, address });
    await user.save();
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    // if password present, mongoose pre('save') won't run with findByIdAndUpdate; handle separately
    const data = { ...req.body };
    if (data.password) {
      // fetch, set and save to trigger hashing
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      Object.assign(user, data);
      await user.save();
      return res.json({ message: 'User updated' });
    }
    const updated = await User.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).select('-password');
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) { next(err); }
};
