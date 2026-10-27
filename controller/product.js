const fs = require("fs");
const { Product } = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    const product = new Product();
    product.title = "AMAN";
    product.price = 1000;
    product.rating = 4.5;
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving product", error });
  }
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  const productDetails = updatedProduct.find((p) => p.id === +productId);
  if (!productDetails) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(productDetails);
};

const getAllProducts = (req, res) => {
  res.json(updatedProduct);
};

const updateProduct = (req, resp) => {
  const productId = req.params.id;
  const productIndex = updatedProduct.findIndex((p) => p.id === +productId);
  // updatedProduct.splice(productIndex, 1, { ...req.body, id: +productId });
  updatedProduct[productIndex] = { id: +productId, ...req.body };
  resp.json({
    data: req.body,
    status: 201,
    message: "Product updated successfully",
  });
};

const patchProduct = (req, resp) => {
  const productId = req.params.id;
  const productIndex = updatedProduct.findIndex((p) => p.id === +productId);

  // updatedProduct.splice(productIndex, 1, { ...req.body, id: +productId });
  updatedProduct[productIndex] = {
    id: +productId,
    ...updatedProduct[productIndex],
    ...req.body,
  };
  resp.json({
    data: req.body,
    status: 201,
    message: "Product updated successfully",
  });
};

const deleteProduct = (req, resp) => {
  const id = req.params.id;
  const productIndex = updatedProduct.findIndex((p) => p.id === +id);
  updatedProduct.splice(productIndex, 1);
  resp.json({
    status: 201,
    message: "Product deleted successfully",
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
