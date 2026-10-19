const fs = require("fs");
const product = fs.readFileSync("data.json", "utf-8");
const updatedProduct = JSON.parse(product).products;

const exspress = require("express");
const morgan = require("morgan"); //middleware for logging this is 3rd party middleware
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
const auther = (req, res, next) => {
  console.log("autherization");
  // if (req.query.password === "123") {
  //   next();
  // }
  // res.status(401).json({ message: "Unauthorized" });
  next();
};
// app.use(auther);

app.get("/product/:id", auther, (req, res) => {
  console.log("params", req.params);
  res.json(updatedProduct);
});
app.post("/", auther, (req, res) => {
  res.json(updatedProduct);
});

app.listen(8080, () => {
  // console.log("server is running on 8080");
});
