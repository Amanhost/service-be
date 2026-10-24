const exspress = require("express");
const { ProductRouter } = require("./routes/productRouter");
const { userRoute } = require("./routes/userRoute");

const app = exspress();
app.use(exspress.json()); // bodyparser

app.use("/products", ProductRouter);
app.use("/users", userRoute);

app.listen(8080, () => {
  // console.log("server is running on 8080");
});
