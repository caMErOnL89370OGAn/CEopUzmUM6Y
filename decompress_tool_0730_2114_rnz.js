// 代码生成时间: 2025-07-30 21:14:52
const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const { createWriteStream } = require('fs');

/*
 * Function to decompress a gzip file.
 * @param {string} sourcePath - The path to the gzip file to decompress.
 * @param {string} destinationPath - The path where the decompressed file will be saved.
 */
function decompressGzipFile(sourcePath, destinationPath) {
  // Read the source gzip file.
  const readStream = fs.createReadStream(sourcePath);
  
  // Create a gzip decompression stream.
  const unzipStream = createGzip({ finishFlush: 'gzip' });
  
  // Write the decompressed data to the destination file.
  const writeStream = createWriteStream(destinationPath);
  
  // Handle errors and ensure streams are properly cleaned up.
  const onError = (err) => {
    console.error('An error occurred:', err.message);
    process.exit(1);
  };
  
  // Setup error handling for each stream.
  readStream.on('error', onError);
  unzipStream.on('error', onError);
  writeStream.on('error', onError);
  
  // Pipe the streams together to perform the decompression.
  pipeline(readStream, unzipStream, writeStream, (err) => {
    if (err) {
      onError(err);
    } else {
      console.log(`Decompression complete. File saved to ${destinationPath}`);
    }
  });
}

/*
 * Main function to handle command line arguments and decompress files.
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error('Usage: node decompress_tool.js <source-gzip-path> <destination-path>');
    process.exit(1);
  }
  
  const sourcePath = args[0];
  const destinationPath = args[1];
  
  // Check if the source file exists.
  const sourceExists = fs.existsSync(sourcePath);
  if (!sourceExists) {
    console.error(`Source file does not exist: ${sourcePath}`);
    process.exit(1);
  }
  
  // Check if the file is a gzip file.
  if (!sourcePath.endsWith('.gz')) {
    console.error(`Source file is not a gzip file: ${sourcePath}`);
    process.exit(1);
  }
  
  // Decompress the gzip file.
  decompressGzipFile(sourcePath, destinationPath);
}

// Run the main function when the script is executed.
main();