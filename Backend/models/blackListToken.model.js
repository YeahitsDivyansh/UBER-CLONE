const mongoose = require("mongoose");

/**
 * Mongoose schema for blacklisted tokens.
 * This schema is used to store tokens that are no longer valid and should be rejected.
 *
 * @typedef {Object} BlacklistTokenSchema
 * @property {String} token - The token string that is blacklisted. This field is required and must be unique.
 * @property {Date} createdAt - The date and time when the token was blacklisted. Defaults to the current date and time.
 *                              This field will automatically expire and be removed from the database after 24 hours (86400 seconds).
 */
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours in seconds
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
