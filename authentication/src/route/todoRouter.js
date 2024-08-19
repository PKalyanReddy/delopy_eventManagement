const { Router } = require("express");
const todoModel = require("../model/todoModel");
const userModel = require("../model/userModel");
const role = require("../middleware/role");

const todoRoute = Router();

todoRoute.get("/", async (req, res) => {
  // res.json({ message: "Todo Route" });
  const userInfo = await userModel.findOne({ email: req.user.email });

  if (userInfo.role == "admin") {
    const todo = await todoModel.find({}).populate("userId");

    return res.json({ todos: todo });
  } else {
    const todo = await todoModel
      .find({ userId: userInfo._id })
      .populate("userId");

    return res.json({ todos: todo });
  }
});

todoRoute.post("/", async (req, res) => {
  const { title } = req.body;

  const userInfo = await userModel.findOne({ email: req.user.email });
  const todoInfo = await todoModel.create({ title, userId: userInfo._id });

  // res.json({ todos: todoInfo });
  res.json({ message: "todo is created" });

});

todoRoute.delete("/:id", role(["admin"]), async (req, res) => {
  const { title } = req.body;

  const userInfo = await todoModel.findByIdAndDelete(req.params.id);
  // const todoInfo = await todoModel.create({ title, userId: userInfo._id });

  // res.json({ todos: todoInfo }); email: req.user.email
  res.json({ message: "todo deleted successfully" });

});

todoRoute.patch("/:id", role(["admin"]), async (req, res) => {
  const { title } = req.body;

  const userInfo = await todoModel.findByIdAndUpdate(req.params.id, req.body);
  // const todoInfo = await todoModel.create({ title, userId: userInfo._id });

  // res.json({ todos: todoInfo }); email: req.user.email
  res.json({ message: "todo updated successfully" });

});

module.exports = todoRoute;
