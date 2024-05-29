const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify TOKEN (check it against the secret in the env file)
      //same secret that was used when user logged in or registered
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token but exclude the password
      //(now this "user" info will be available in the headers as req.user)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  //if there is no token, throw error
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = protect;
