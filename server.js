require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const setupSwagger = require('./swagger/swagger');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set. Add it to .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// swagger
setupSwagger(app);

// routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// health
app.get('/', (req, res) => res.json({ ok: true, message: 'ShopStream API' }));

// error handler (last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
