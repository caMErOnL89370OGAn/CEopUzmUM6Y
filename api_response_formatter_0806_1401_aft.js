// 代码生成时间: 2025-08-06 14:01:48
// Dependencies
const httpStatus = require('http-status-codes');

// Define the API Response Formatter
class ApiResponseFormatter {
  /**
   * Constructor for ApiResponseFormatter
   * @param {Object} options - Options to customize the formatter
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Formats a success response
   * @param {Object} data - The data to be sent in the response
   * @param {number} [statusCode=200] - The HTTP status code for the response
   * @returns {Object} A formatted API success response
   */
  success(data, statusCode = httpStatus.OK) {
    return this.formatResponse(
      {
        status: 'success',
        statusCode,
        data,
      },
      statusCode
    );
  }

  /**
   * Formats an error response
   * @param {Object} error - The error object to be sent in the response
   * @param {number} [statusCode=500] - The HTTP status code for the response
   * @returns {Object} A formatted API error response
   */
  error(error, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
    return this.formatResponse(
      {
        status: 'error',
        statusCode,
        error,
      },
      statusCode
    );
  }

  /**
   * Formats the response with the given data and status code
   * @param {Object} response - The response object to be formatted
   * @param {number} statusCode - The HTTP status code for the response
   * @returns {Object} A formatted API response
   */
  formatResponse(response, statusCode) {
    // Add any additional formatting or processing here as needed
    return response;
  }
}

// Export the ApiResponseFormatter class for use in other modules
module.exports = ApiResponseFormatter;