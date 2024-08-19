// const userModel = require("../model/userModel");

// const role = (roles) => {
//   return async (req, res, next) => {
//     const user_email = req.user.email;
//     const user = await userModel.findOne({ email: user_email });
//     if (roles.includes(user.role)) {
//       next();
//     } else {
//       return res.status(401).json({ message: "You're not authorized" });
//     }
//   };
// };

// module.exports = role;


const userModel = require("../model/userModel");

const role = (roles) => {
  return async (req, res, next) => {
    const user_email = req.user.email;
    const user = await userModel.findOne({ email: user_email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (roles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({ message: "You're not authorized" });
    }
  };
};

module.exports = role;
