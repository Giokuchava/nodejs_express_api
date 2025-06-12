const express = require('express');
const router = express.Router();
const productService = require('../services/productService');


router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.patch('/:id/specifications', async (req, res) => {
  try {
    const updatedProduct = await productService.updateProductSpecifications(req.params.id, req.body.specifications);
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/search', async (req, res) => {
  try {
    const { page, limit, title } = req.query;
    const results = await productService.searchProducts({ page, limit, title });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
