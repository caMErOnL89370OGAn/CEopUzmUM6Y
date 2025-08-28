// 代码生成时间: 2025-08-29 01:05:31
// Import necessary modules
const validator = require('validator'); // External library for validation

// Validator function that takes an object with form data
function validateFormData(formData) {
  // Destructure the form data for easier access
  const { username, email, password, confirmPassword } = formData;

  // Validation rules
  const rules = {
    username: username => username.length >= 3 && username.length <= 20,
    email: email => validator.isEmail(email),
    password: password => password.length >= 8,
    confirmPassword: (password, confirmPassword) => password === confirmPassword
  };

  // Error messages for each validation rule
  const errorMessages = {
    username: 'Username must be between 3 and 20 characters.',
    email: 'Email must be a valid email address.',
    password: 'Password must be at least 8 characters long.',
    confirmPassword: 'Passwords do not match.'
  };

  // Object to store errors
  const errors = {};

  // Validate each field and collect errors
  for (const [key, value] of Object.entries(rules)) {
    const errorMessage = errorMessages[key];
    const isValid = typeof value === 'function' ? value(formData[key], formData[Object.keys(rules)[3]] === 'confirmPassword' ? formData.password : null) : value(formData[key]);
    if (!isValid) {
      errors[key] = errorMessage;
    }
  }

  // Check if there are any errors and return the result
  if (Object.keys(errors).length === 0) {
    return { isValid: true };
  } else {
    return { isValid: false, errors };
  }
}

// Export the validate function
module.exports = validateFormData;