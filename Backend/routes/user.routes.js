// Import the Express framework
const express = require("express");

// Create a new router instance to define user-related routes
const router = express.Router();

// Import the "body" function from express-validator to validate incoming requests
const { body } = require("express-validator");

// Import the user controller that contains logic for handling user requests
const userController = require("../controllers/user.controller");

// Import authentication middleware to protect certain routes
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route   POST /api/users/register
 * @desc    Registers a new user with validation checks
 * @access  Public
 */
router.post(
  "/register",
  [
    // Validate the "email" field to ensure it's a proper email format
    body("email").isEmail().withMessage("Invalid Email"),

    // Validate that the first name is at least 3 characters long
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    // Validate that the password is at least 6 characters long for security
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  // Call the controller function to handle user registration
  userController.registerUser
);

/**
 * @route   POST /api/users/login
 * @desc    Logs in a user and returns a JWT token
 * @access  Public
 */
router.post(
  "/login",
  [
    // Validate that the "email" field is in a proper format
    body("email").isEmail().withMessage("Invalid Email"),

    // Ensure that the password is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  // Call the controller function to handle user login
  userController.loginUser
);

/**
 * @route   GET /api/users/profile
 * @desc    Retrieves the authenticated user's profile
 * @access  Private (Requires authentication)
 */
router.get(
  "/profile",
  // Apply authentication middleware to ensure the user is logged in
  authMiddleware.authUser,

  // Call the controller function to fetch user profile data
  userController.getUserProfile
);

/**
 * @route   GET /api/users/logout
 * @desc    Logs out the user by clearing the token and blacklisting it
 * @access  Private (Requires authentication)
 */
router.get(
  "/logout",
  // Apply authentication middleware to ensure the user is logged in
  authMiddleware.authUser,

  // Call the controller function to handle user logout
  userController.logoutUser
);

// Export the router so it can be used in other parts of the application
module.exports = router;
