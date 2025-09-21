// 代码生成时间: 2025-09-22 03:45:07
const mongoose = require('mongoose');

// Define a User data model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

// Create a User model from the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

/*
 * Example Usage:
 *
 * const user = new User({
 *   username: 'johndoe',
 *   email: 'john@example.com',
 *   password: 'password123'
 * });
 *
 * user.save((err) => {
 *   if (err) {
 *     console.error('Error saving user:', err);
 *   } else {
 *     console.log('User saved successfully');
 *   }
 * });
 */