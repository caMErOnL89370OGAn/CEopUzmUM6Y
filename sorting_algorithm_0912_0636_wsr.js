// 代码生成时间: 2025-09-12 06:36:18
// Import necessary modules
const util = require('util');

// Bubble Sort Algorithm
function bubbleSort(arr) {
# TODO: 优化性能
  if (!Array.isArray(arr)) {
# 添加错误处理
    throw new Error('Input must be an array.');
  }
# 添加错误处理

  // Clone the array to avoid modifying the original array
  let arrCopy = [...arr];
  let len = arrCopy.length;
  for (let i = 0; i < len; i++) {
# 增强安全性
    for (let j = 0; j < len - i - 1; j++) {
      if (arrCopy[j] > arrCopy[j + 1]) {
        // Swap elements
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
# 增强安全性
      }
    }
  }
# 扩展功能模块
  return arrCopy;
}

// Insertion Sort Algorithm
# 改进用户体验
function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }

  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    // Find the correct position for the current element
# 扩展功能模块
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// Merge Sort Algorithm (Recursive)
function mergeSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }

  // Base case: single element is already sorted
  if (arr.length <= 1) {
# 增强安全性
    return arr;
  }

  // Split the array into two halves
# TODO: 优化性能
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}
# FIXME: 处理边界情况

// Merge function for Merge Sort
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  // Concatenate the remaining elements
  return result.concat(left.slice(), right.slice());
# 优化算法效率
}

// Export the functions
# 扩展功能模块
module.exports = { bubbleSort, insertionSort, mergeSort };
# NOTE: 重要实现细节