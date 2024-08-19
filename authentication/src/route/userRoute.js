const { Router } = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blackListModeel");
require("dotenv").config();
const userRoute = Router();

userRoute.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const check = await userModel.findOne({ email: req.body.email });

    if (check) {
      return res
        .status(400)
        .json({ message: "This email address already registered" });
    }

    await bcrypt.hash(password, 5, async (err, hash) => {
      if (err) console.log(err);

      const user = await userModel.create({
        username: username,
        email: email,
        password: hash,
      });
      res.status(201).json({ message: "user is registered successfully" });
      //   console.log("password: ", hash);
    });
  } catch (error) {
    console.log(error);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await userModel.findOne({ email: email });

    if (!check) {
      return res.status(400).json({
        message: "this email is not registered try to register your self ",
      });
    }

    await bcrypt.compare(password, check.password, (err, result) => {
      if (err) console.log(err);

      const payload = { email: check.email };
      if (result) {
        const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "10h",
        });

        const refresh_token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "10h",
        });

        res.json({ access_token, refresh_token });
      } else {
        return res.status(400).json({
          message: "user information not found",
        });
      }

      //   console.log(result);
    });

    // console.log(password, check);
  } catch (error) {
    console.log(error);
  }
});

userRoute.get("/logout", async (req, res) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.json({ message: "token header is not present" });
    }

    const token = header.split(" ")[1];

    const blacklist = await blackListModel.create({ token });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRoute;
