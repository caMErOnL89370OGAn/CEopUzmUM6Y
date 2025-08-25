// 代码生成时间: 2025-08-25 09:02:42
 * interactive_chart_generator.js
 * A Node.js program that acts as an interactive chart generator.
 * It uses the `readline` module for interactive input and `chart.js` for chart generation.
 */

const fs = require('fs');
const readline = require('readline');
const Chart = require('chart.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Initialize Chart.js with the node-canvas renderer
Chart.register(ChartJSNodeCanvas);

// Create a readline interface for interactive user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate an interactive chart
function generateChart(options) {
  return new Promise((resolve, reject) => {
    const canvas = new ChartJSNodeCanvas({ width: options.width, height: options.height });
    const chart = new Chart(canvas, {
      type: options.type,
      data: options.data,
      options: options.options
    });
    chart.on('render', () => {
      chart.canvas.toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          fs.writeFileSync(options.outputFile, buffer);
          resolve('Chart generated successfully.');
        }
      });
    });
    chart.render();
  });
}

// Main function to handle user input and generate chart
async function main() {
  try {
    // Ask user for chart type
    const chartType = await askQuestion('Enter chart type (e.g., line, bar, pie): ');
    
    // Ask user for chart data
    const chartData = await askQuestion('Enter chart data (e.g., {labels: ["Label 1", "Label 2"], datasets: [{data: [10, 20]}]}): ');
    
    // Ask user for chart options
    const chartOptions = await askQuestion('Enter chart options (e.g., {responsive: true, maintainAspectRatio: false}): ');
    
    // Ask user for output file name
    const outputFile = await askQuestion('Enter output file name (e.g., chart.png): ');
    
    // Convert user input to JSON
    const data = JSON.parse(chartData);
    const options = JSON.parse(chartOptions);
    
    // Generate chart
    const result = await generateChart({ type: chartType, data: data, options: options, width: 800, height: 600, outputFile: outputFile });
    console.log(result);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Helper function to ask questions and return user input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Start the main function
main();
