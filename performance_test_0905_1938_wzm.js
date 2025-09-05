// 代码生成时间: 2025-09-05 19:38:22
const { performance } = require('perf_hooks');


/**
 * Defines a function to measure the execution time of a given task.
 * @param {Function} task - The function to be executed and timed.
 * @returns {void} - Logs the start and end times, and the duration.
 */
function measureExecutionTime(task) {

  console.log('Starting task...');

  const start = performance.now();

  task();

  const end = performance.now();

  console.log(`Task completed in ${end - start} milliseconds.');

}


/**
 * Example task function to simulate some work.
 * This can be replaced with any function you want to test.
 */
function exampleTask() {

  // Simulate some work by waiting for 500ms

  const timeout = 500;

  setTimeout(() => {

    console.log('Task executed.');

  }, timeout);

}


// Main function to run the performance test.

function main() {

  try {

    measureExecutionTime(exampleTask);

  } catch (error) {

    console.error('An error occurred during performance testing:', error);

  }

}


// Run the main function if this script is executed directly.

if (require.main === module) {

  main();

}

