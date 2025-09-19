// 代码生成时间: 2025-09-19 12:24:09
// Importing necessary modules
const readline = require('readline');

// Defining a class for Sorting
class SortingAlgorithms {
  // Constructor
  constructor() {
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Function to perform bubble sort
  bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  // Function to perform selection sort
  selectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  // Function to perform insertion sort
  insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }

  // Function to perform merge sort
  mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  // Function to perform quick sort
  quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const left = [], right = [], pivot = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return this.quickSort(left).concat([pivot]).concat(this.quickSort(right));
  }

  // Function to prompt user for input and sort array
  promptAndSort() {
    this.readlineInterface.question('Enter numbers separated by space: ', (input) => {
      const numbers = input.trim().split(' ').map(Number);
      try {
        const sortedNumbers = this.quickSort(numbers);
        console.log('Sorted array:', sortedNumbers);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        this.readlineInterface.close();
      }
    });
  }

  // Function to start the sorting program
  start() {
    console.log('Welcome to the Sorting Algorithm Program.');
    this.promptAndSort();
  }
}

// Creating an instance of SortingAlgorithms and starting the program
const sortingAlgorithms = new SortingAlgorithms();
sortingAlgorithms.start();