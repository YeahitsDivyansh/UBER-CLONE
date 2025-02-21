// Import necessary modules
const userModel = require("../models/user.model"); // Import the user model
const userService = require("../services/user.service"); // Import the user service for user-related operations
const { validationResult } = require("express-validator"); // Import express-validator for input validation
const blackListTokeModel = require("../models/blackListToken.model"); // Import the blacklist token model to store logged-out tokens

/**
 * @desc   Registers a new user
 * @route  POST /api/users/register
 * @access Public
 */
module.exports.registerUser = async (req, res, next) => {
  // Check if request validation failed (e.g., missing fields, incorrect format)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors as a JSON response
  }

  // Extract user details from the request body
  const { fullname, email, password } = req.body;

  // Hash the user's password before storing it in the database
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user in the database
  const user = await userService.createUser({
    firstname: fullname.firstname, // Extract the first name from fullname object
    lastname: fullname.lastname, // Extract the last name from fullname object
    email,
    password: hashedPassword, // Store the hashed password in the database
  });

  // Generate a JWT token for the newly registered user
  const token = user.generateAuthToken();

  // Return the token and user details as a response
  res.status(201).json({ token, user });
};

/**
 * @desc   Logs in an existing user
 * @route  POST /api/users/login
 * @access Public
 */
module.exports.loginUser = async (req, res, next) => {
  // Validate the request (e.g., check if email and password are provided)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password from request body
  const { email, password } = req.body;

  // Find the user in the database by email, including the password field (since it's usually hidden)
  const user = await userModel.findOne({ email }).select("+password");

  // If the user is not found, return an authentication error
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the entered password with the hashed password stored in the database
  const isMatch = await user.comparePassword(password);

  // If passwords do not match, return an authentication error
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate a new JWT token for the authenticated user
  const token = user.generateAuthToken();

  // Store the token in an HTTP-only cookie for security purposes
  res.cookie("token", token);

  // Return the token and user details as a response
  res.status(200).json({ token, user });
};

/**
 * @desc   Fetches the profile of the authenticated user
 * @route  GET /api/users/profile
 * @access Private (Requires Authentication)
 */
module.exports.getUserProfile = async (req, res, next) => {
  // Since the user has already been authenticated via middleware, return the user data
  res.status(200).json(req.user);
};

/**
 * @desc   Logs out the authenticated user
 * @route  POST /api/users/logout
 * @access Private (Requires Authentication)
 */
module.exports.logoutUser = async (req, res, next) => {
  // Clear the authentication cookie from the browser
  res.clearCookie("token");

  // Extract the token from either cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  // Store the token in a blacklist to prevent future use
  await blackListTokeModel.create({ token });

  // Return a success message
  res.status(200).json({ message: "Logged out successfully" });
};
