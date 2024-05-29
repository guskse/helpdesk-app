const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//Models
const User = require("../models/userModel");

//json web token
const jwt = require("jsonwebtoken");

//generate token when logging in or registering
function generateWebToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //token will expire in 7 days
    expiresIn: "7d",
  });
}

//@ DESC - REGISTER NEW USER
//@ METHOD: POST
//@ PATH: /api/users/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please include all fields`);
  }

  //check if user already exists (checking if email is already registered in the DB)
  const userExists = await User.findOne({ email });

  //if user already exists (email already registered)
  if (userExists) {
    res.status(400);
    throw new Error(`User already registered`);
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //if user was created successfuly
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@ DESC - LOGIN USER
//@ METHOD: POST
//@ PATH: /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //compare passwords (user password in the mongoDB and the password in req.body)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid credentials`);
  }
});

//@ DESC - GET CURRENT USER
//@ METHOD: GET
//@ PATH: /api/users/me
const getMe = asyncHandler(async (req, res) => {
  //get user info from req.user (see protect function in authMiddleware)
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getMe };
