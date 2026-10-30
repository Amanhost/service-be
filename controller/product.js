const { Products } = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productDetails = await Products.findById(req.params.id);
    if (!productDetails) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(productDetails);
  } catch (error) {
    res.status(400).json({ message: "Invalid product id", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const updateProduct = async (req, resp) => {
  try {
    const product = await Products.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" },
    );
    if (!product) {
      return resp.status(404).json({ message: "Product not found" });
    }
    resp.json({
      data: product,
      status: 200,
      message: "Product updated successfully",
    });
  } catch (error) {
    resp.status(400).json({ message: "Error updating product", error });
  }
};

const patchProduct = async (req, resp) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!product) {
      return resp.status(404).json({ message: "Product not found" });
    }
    resp.json({
      data: product,
      status: 200,
      message: "Product updated successfully",
    });
  } catch (error) {
    resp.status(400).json({ message: "Error updating product", error });
  }
};

const deleteProduct = async (req, resp) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return resp.status(404).json({ message: "Product not found" });
    }
    resp.json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    resp.status(400).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
