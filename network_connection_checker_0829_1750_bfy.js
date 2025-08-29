// 代码生成时间: 2025-08-29 17:50:25
// Import necessary Node.js modules
const net = require('net');

// Configuration
const HOST = '8.8.8.8'; // Google DNS server IP for checking internet connectivity
const PORT = 53; // DNS port

// Function to check network connection status
function checkNetworkConnection() {
  // Create a client connection
  const client = new net.Socket();

  // Event listener for connection success
  client.connect(PORT, HOST, () => {
    console.log('Network connection is active!');
  });

  // Event listener for connection errors
  client.on('error', (err) => {
    // Handle different types of errors
    if (err.code === 'ECONNREFUSED') {
      console.error('Connection refused: The host is not reachable or not listening on the specified port.');
    } else if (err.code === 'ETIMEDOUT') {
      console.error('Connection timed out: The operation timed out.');
    } else {
      console.error('An unexpected error occurred:', err.message);
    }
  });

  // Set a timeout for the connection attempt
  client.setTimeout(5000, () => {
    if (client.writable) {
      client.end();
    }
  });
}

// Export the function for use in other modules or scripts
module.exports = checkNetworkConnection;

// If this script is executed directly, run the connection check
if (require.main === module) {
  checkNetworkConnection();
}