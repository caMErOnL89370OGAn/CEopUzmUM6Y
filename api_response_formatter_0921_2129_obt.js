// 代码生成时间: 2025-09-21 21:29:43
 * @param {string} [message=''] - An optional message to include in the response.
 * @param {boolean} [success=true] - Indicates whether the request was successful.
 * @returns {Object} A formatted API response object.
 */
function formatApiResponse(data, message = '', success = true) {
  // Check if data is valid and not null or undefined
  if (data === null || typeof data === 'undefined') {
    throw new Error('Data is required and cannot be null or undefined.');
  }

  return {
    success,
    message,
    data: data
  };
}

/**
 * Error handler for API responses.
 *
 * @param {Error} error - The error object to format.
 * @returns {Object} A formatted error response object.
 */
function formatApiErrorResponse(error) {
  return {
    success: false,
    message: error.message,
    error: error
  };
}

// Export the module
module.exports = {
  formatApiResponse,
  formatApiErrorResponse
};