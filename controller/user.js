const fs = require("fs");

const usersData = fs.readFileSync("data.json", "utf-8");
const users = JSON.parse(usersData).users;

const getAllUsers = (req, res) => {
  res.json(users);
};
const getUserById = (req, res) => {
  const userId = req.params.id;
  const userDetails = users.find((u) => u.id === +userId);
  if (!userDetails) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(userDetails);
};

const createUser = (req, res) => {
  users.push(req.body);

  res.json({
    data: req.body,
    status: 201,
    message: "User created successfully",
  });
};
const updateUser = (req, resp) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === +userId);
  // users.splice(userIndex, 1, { ...req.body, id: +userId });
  users[userIndex] = { id: +userId, ...req.body };
  resp.json({
    data: req.body,
    status: 201,
    message: "User updated successfully",
  });
};

const patchUser = (req, resp) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === +userId);

  // users.splice(userIndex, 1, { ...req.body, id: +userId });
  users[userIndex] = {
    id: +userId,
    ...users[userIndex],
    ...req.body,
  };
  resp.json({
    data: req.body,
    status: 201,
    message: "User updated successfully",
  });
};

const deleteUser = (req, resp) => {
  const id = req.params.id;
  const userIndex = users.findIndex((u) => u.id === +id);
  users.splice(userIndex, 1);
  resp.json({
    status: 201,
    message: "User deleted successfully",
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
