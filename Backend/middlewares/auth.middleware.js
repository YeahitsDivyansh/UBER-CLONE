// Import necessary modules
const userModel = require("../models/user.model"); // Import the user model to interact with the database
const bcrypt = require("bcrypt"); // Library for hashing and verifying passwords (not used in this function, but good to have)
const jwt = require("jsonwebtoken"); // Library for generating and verifying JSON Web Tokens (JWT)
const blackListTokenModel = require("../models/blacklistToken.model"); // Import the blacklisted token model to interact with the database
const captainModel = require("../models/captain.model");

/**
 * @desc   Middleware to authenticate users using JWT tokens.
 * @route  Applied to protected routes (e.g., profile, dashboard)
 * @access Private (Requires a valid JWT token)
 */
module.exports.authUser = async (req, res, next) => {
  // Extract the JWT token from either cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If no token is found, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is blacklisted (i.e., logged-out users)
  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user details from the database using the decoded user ID
    const user = await userModel.findById(decoded._id);

    // If user is not found, return an unauthorized response
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach the user details to the request object for further processing in the route
    req.user = user;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // If token verification fails, return an unauthorized response
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;

    return next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: "Unauthorized" });
  }
};
