// Import the user model to interact with the database
const userModel = require("../models/user.model");

/**
 * Function to create a new user in the database
 * @param {Object} userDetails - Object containing user details
 * @param {string} userDetails.firstname - First name of the user (required)
 * @param {string} userDetails.lastname - Last name of the user (optional)
 * @param {string} userDetails.email - Email address of the user (required, must be unique)
 * @param {string} userDetails.password - Password of the user (required, will be hashed before saving)
 * @returns {Promise<Object>} - Returns the created user object
 * @throws {Error} - Throws an error if required fields are missing
 */
module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  // Check if required fields are provided
  if (!firstname || !email || !password) {
    throw new Error("All fields are required"); // Throw an error if any required field is missing
  }

  // Create a new user document in the database
  const user = userModel.create({
    fullname: {
      firstname,
      lastname, // Last name is optional
    },
    email,
    password, // Ensure the password is hashed before saving in the actual model (if not already handled)
  });

  // Return the created user object (will be a Promise)
  return user;
};
