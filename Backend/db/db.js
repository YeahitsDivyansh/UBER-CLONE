// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

/**
 * Function to connect to the MongoDB database
 */
function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT) // Connect using the database URI from environment variables
    .then(() => {
      console.log("Connected to DB"); // Log success message when connection is established
    })
    .catch((err) => console.log(err)); // Log any connection errors
}

// Export the function to be used in other parts of the application
module.exports = connectToDb;
