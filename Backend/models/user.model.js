// Importing required modules
const mongoose = require("mongoose"); // MongoDB ODM (Object-Document Mapping)
const bcrypt = require("bcrypt"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for generating JSON Web Tokens

// Define the user schema
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true, // First name is required
      minlength: [3, "First name must be at least 3 characters"], // Minimum length validation
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"], // Minimum length validation
    },
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Ensures no duplicate emails
    minlength: [5, "Email must be at least 5 characters long"], // Minimum length validation
  },
  password: {
    type: String,
    required: true, // Password is required
    select: false, // Prevents the password from being included in queries by default
  },
  socketId: {
    type: String, // Used for real-time connections (e.g., WebSockets)
  },
});

// Method to generate an authentication token for a user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET); // Sign the token using the user's ID and a secret key
  return token;
};

// Method to compare a given password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Returns true if the password matches
};

// Static method to hash a password before storing it in the database
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Hash the password with a salt factor of 10
};

// Create the user model using the schema
const userModel = mongoose.model("user", userSchema);

// Export the user model for use in other parts of the application
module.exports = userModel;
