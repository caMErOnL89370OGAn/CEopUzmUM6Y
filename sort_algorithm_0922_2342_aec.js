// 代码生成时间: 2025-09-22 23:42:09
// Importing necessary modules
const readline = require('readline');

// Function to prompt user for input
function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a list of numbers separated by space: ', (input) => {
    const numbers = input.split(' ').map(Number);
    sortAndPrint(numbers);
    rl.close();
  });
}

// Function to sort an array of numbers using bubble sort
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Function to sort an array of numbers using insertion sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Function to sort and print the sorted array
function sortAndPrint(arr) {
  // Check if input is valid
  if (!Array.isArray(arr) || !arr.every(Number.isFinite)) {
    console.error('Error: Invalid input. Please enter a list of numbers separated by space.');
    return;
  }

  // Sort array using bubble sort
  const bubbleSorted = bubbleSort([...arr]);
  console.log('Bubble Sort:');
  console.log(bubbleSorted.join(' '));

  // Sort array using insertion sort
  const insertionSorted = insertionSort([...arr]);
  console.log('Insertion Sort:');
  console.log(insertionSorted.join(' '));
}

// Start the program
promptUser();