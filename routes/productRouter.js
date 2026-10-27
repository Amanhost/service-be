const exspress = require("express");
const ProductRouter = exspress.Router();

const {
  patchProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getProductById,
  getAllProducts,
} = require("../controller/product");

ProductRouter.get("/", getAllProducts)
  .get("/:id", getProductById)
  .post("/", createProduct)
  .put("/:id", updateProduct)
  .patch("/:id", patchProduct)
  .delete("/:id", deleteProduct);

module.exports = { ProductRouter };
