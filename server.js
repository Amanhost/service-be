require("dotenv").config();
const exspress = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const { ProductRouter } = require("./routes/productRouter");
const { userRoute } = require("./routes/userRoute");

const app = exspress();
app.use(cors());
app.use(exspress.json()); // bodyparser

//dbconnection
let dbConnection;
function connectDB() {
  if (!dbConnection) {
    dbConnection = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
      dbConnection = null;
      throw err;
    });
  }
  return dbConnection;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});
app.use("/products", ProductRouter);
app.use("/users", userRoute);

const PORT = process.env.PORT || 8080;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log("server is running on " + PORT);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

module.exports = app;
//schema
