const fs = require("fs");
const product = fs.readFileSync("data.json", "utf-8");
const updatedProduct = JSON.parse(product).products;

const exspress = require("express");
// const morgan = require("morgan"); //middleware for logging this is 3rd party middleware
const app = exspress();
// bodyparser
app.use(exspress.json());
// app.use(exspress.urlencoded({ extended: true }));

// app.use(morgan("default")); //middleware for logging this is 3rd party middleware
// app.use(exspress.static("public")); //static file serving,hoisting

// application level middleware
// app.use((req, res, next) => {
//   console.log(req.hostname, new Date(), req.get("User-Agent"));
//   next();
// });

// router-level middleware
// const auther = (req, res, next) => {
//   console.log("autherization");
// if (req.query.password === "123") {
//   next();
// }
// res.status(401).json({ message: "Unauthorized" });
//   next();
// };
// app.use(auther);

app.get("/products", (req, res) => {
  res.json(updatedProduct);
});
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const productDetails = updatedProduct.find((p) => p.id === +productId);
  if (!productDetails) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(productDetails);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  updatedProduct.push(req.body);

  res.json({
    data: req.body,
    status: 201,
    message: "Product created successfully",
  });
});

// Update API
app.put("/products/:id", (req, resp) => {
  const productId = req.params.id;
  const productIndex = updatedProduct.findIndex((p) => p.id === +productId);
  // updatedProduct.splice(productIndex, 1, { ...req.body, id: +productId });
  updatedProduct[productIndex] = { id: +productId, ...req.body };
  resp.json({
    data: req.body,
    status: 201,
    message: "Product updated successfully",
  });
});
// PATCH API
app.patch("/products/:id", (req, resp) => {
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
});

// Delete API

app.delete("/products/:id", (req, resp) => {
  const id = req.params.id;
  const productIndex = updatedProduct.findIndex((p) => p.id === +id);
  updatedProduct.splice(productIndex, 1);
  resp.json({
    status: 201,
    message: "Product deleted successfully",
  });
});
app.listen(8080, () => {
  // console.log("server is running on 8080");
});
