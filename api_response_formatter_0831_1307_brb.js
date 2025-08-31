// 代码生成时间: 2025-08-31 13:07:06
const http = require('http');

// ApiResponseFormatter class
class ApiResponseFormatter {
  // Constructor to initialize the formatter with a custom response template
  constructor(responseTemplate) {
    this.responseTemplate = responseTemplate;
  }

  // Method to format the API response
  formatResponse(data, statusCode) {
    try {
      // Check if data is valid
      if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be a non-null object');
      }

      // Check if statusCode is valid
      if (typeof statusCode !== 'number' || (statusCode < 200 || statusCode >= 600)) {
        throw new Error('Status code must be a valid HTTP status code');
      }

      // Format the response using the template
      return JSON.stringify({
        ...this.responseTemplate,
        data: data,
        statusCode: statusCode,
      });
    } catch (error) {
      // Handle errors by returning a default error response
      return JSON.stringify({
        ...this.responseTemplate,
        data: {
          error: error.message,
        },
        statusCode: 500,
      });
    }
  }
}

// Create an HTTP server that uses the ApiResponseFormatter
const server = http.createServer((req, res) => {
  // Assume this is a simple endpoint that returns a JSON response
  const data = { message: 'Hello, World!' };
  const formatter = new ApiResponseFormatter({
    version: '1.0',
    timestamp: new Date().toISOString(),
  });

  // Format the response and send it back to the client
  const formattedResponse = formatter.formatResponse(data, 200);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(formattedResponse);
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Export the ApiResponseFormatter class for use in other modules
module.exports = ApiResponseFormatter;