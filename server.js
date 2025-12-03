require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const setupSwagger = require("./swagger/swagger");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const PORT = 3000; // Force port 3000 locally
const MONGO_URI = process.env.MONGO_URI;

// Check Mongo URI
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set. Add it to .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Swagger
setupSwagger(app);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Health check
app.get("/", (req, res) => res.json({ ok: true, message: "ShopStream API" }));

// Error handler (last middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Swagger docs available at http://localhost:${PORT}/api/docs`);
});
