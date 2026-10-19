// const express = require("express");

// const app = express();

// app.listen(3000, () => {
//   console.log("Server is rummomg on 3000");
// });
const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const product = fs.readFileSync("data.json", "utf-8");
const products = JSON.parse(product).products;

const server = http.createServer((req, resp) => {
  console.log(req.url);
  if (req.url.startsWith("/product")) {
    const productId = req.url.split("/")[2];
    const productDetails = products.find((p) => p.id === +productId);

    resp.setHeader("Content-Type", "text/html");
    const updatedIndex = index
      .replace("{{product}}", productDetails.title)
      .replace("{{img}}", productDetails.images[0])
      .replace("{{description}}", productDetails.description)
      .replace("{{price}}", productDetails.price);
    resp.end(updatedIndex);
    return;
  }
  switch (req.url) {
    case "/":
      resp.setHeader("Content-Type", "text/html");
      resp.end(index);
      break;
    case "/api":
      resp.setHeader("Content-Type", "application/json");
      resp.end(JSON.stringify(products));
      break;
      // case "/product":
      //   resp.setHeader("Content-Type", "text/html");
      //   const updatedIndex = index
      //     .replace("{{product}}", products.title)
      //     .replace("{{img}}", products.images)
      //     .replace("{{description}}", products.description)
      //     .replace("{{price}}", products.price);
      //   resp.end(updatedIndex);
      break;
    default:
      resp.writeHead(404, "notFOund");
      resp.end();
  }
  // resp.setHeader("Content-Type", "application/json");
  // resp.setHeader("Content-Type", "text/html");
  // resp.end(index);
});

server.listen(8080);
