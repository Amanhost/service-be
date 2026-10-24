const exspress = require("express");
const userRoute = exspress.Router();

const {
  patchUser,
  deleteUser,
  updateUser,
  createUser,
  getUserById,
  getAllUsers,
} = require("../controller/user");

userRoute
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .post("", createUser)
  .put("/:id", updateUser)
  .patch("/:id", patchUser)
  .delete("/:id", deleteUser);

module.exports = { userRoute };
