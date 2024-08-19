const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blackListModeel");
require("dotenv").config();
const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.json({ message: "token header is not present" });
  }

  const token = header.split(" ")[1];
  const blacklistCheck = await blackListModel.findOne({ token: token });
  if (blacklistCheck) {
    return res.json({ message: "token is blacklisted login again" });
  }
  let decode = jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      req.user = { email: result.email };
      // console.log({ email: result.email });
      next();
    }

    // console.log(result);
  });
  // if (!decode) {
  //   return res.json({ message: "this is not a valid token" });
  // } else {
  //   next();
  // }
};

module.exports = auth;
