// 代码生成时间: 2025-09-08 07:38:53
 * It takes an object with form data and validation rules as input and returns
 * an object with the validation results.
 */

const validateFormData = (data, rules) => {
  // Initialize an object to store validation errors
  const errors = {};

  // Loop through each rule and validate the corresponding field
  for (const ruleName in rules) {
    const rule = rules[ruleName];

    // Check if the rule exists for the provided field
    if (!data.hasOwnProperty(ruleName)) {
      errors[ruleName] = `Field ${ruleName} is missing`;
      continue;
    }

    // Check if the field is required and has no value
    if (rule.required && !data[ruleName]) {
      errors[ruleName] = `${ruleName} is required`;
      continue;
    }

    // Perform type-specific validation
    switch (rule.type) {
      case 'string':
        // Validate string length if specified
        if (rule.minLength && data[ruleName].length < rule.minLength) {
          errors[ruleName] = `${ruleName} must be at least ${rule.minLength} characters long`;
        }
        if (rule.maxLength && data[ruleName].length > rule.maxLength) {
          errors[ruleName] = `${ruleName} must not exceed ${rule.maxLength} characters`;
        }
        break;
      case 'email':
        // Validate email format
        const emailRegex = /^(([^<>()\[\]\.,;:\s@"!#\$%&'\*+-=\?\^_`{|}~\]\/)|(".+")))@((\[0-9]{1,3}\.)|(([0-9A-Za-z-]+\.)+[0-9A-Za-z]{2,}))$/;
        if (!emailRegex.test(data[ruleName])) {
          errors[ruleName] = `${ruleName} is not a valid email address`;
        }
        break;
      // Add more type cases as needed
      default:
        // If no matching type, consider the field valid
        break;
    }
  }

  // Return the errors object
  return errors;
};

// Example usage
const formData = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

const validationRules = {
  name: {
    required: true,
    type: 'string',
    minLength: 2
  },
  email: {
    required: true,
    type: 'email'
  }
};

const errors = validateFormData(formData, validationRules);
if (Object.keys(errors).length > 0) {
  console.log('Validation errors:', errors);
} else {
  console.log('Form data is valid!');
}