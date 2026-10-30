require("dotenv").config();
const exspress = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const { ProductRouter } = require("./routes/productRouter");
const { userRoute } = require("./routes/userRoute");

const app = exspress();
app.use(cors());
app.use(exspress.json()); // bodyparser
app.use("/products", ProductRouter);
app.use("/users", userRoute);

const PORT = process.env.PORT || 8080;
//dbconnection// getting-started.js

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log("server is running on " + PORT);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
main();
//schema
