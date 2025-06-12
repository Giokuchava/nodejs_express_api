const Product = require('../models/product');

async function getAllProducts() {
  return Product.find();
}

async function getProductById(id) {
  return Product.findById(id);
}

async function addProduct(productData) {
  const product = new Product(productData);
  return product.save();
}

async function updateProductSpecifications(id, specifications) {
  return Product.findByIdAndUpdate(id, { specifications }, { new: true });
}

async function searchProducts({ page = 1, limit = 10, title }) {
  page = parseInt(page);
  limit = parseInt(limit);

  const filter = {};
  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  const results = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const totalResults = await Product.countDocuments(filter);

  return {
    page,
    limit,
    totalPages: Math.ceil(totalResults / limit),
    totalResults,
    results
  };
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductSpecifications,
  searchProducts
};
