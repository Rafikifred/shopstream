const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: sugar
 *               description:
 *                 type: string
 *                 example: Sweet sugar
 *               price:
 *                 type: number
 *                 example: 1000
 *               sku:
 *                 type: string
 *                 example: menean
 *               stock:
 *                 type: number
 *                 example: 12
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["grocery"]
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/sugar.jpg"]
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation failed
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, sku, stock, categories, images } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      sku,
      stock,
      categories,
      images,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         sku:
 *           type: string
 *         stock:
 *           type: number
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 */

module.exports = router;
