// 代码生成时间: 2025-08-19 09:24:56
const os = require('os');
const process = require('process');

/**
 * 分析当前进程的内存使用情况
 * @return {Object} 内存使用情况对象
 */
function analyzeMemoryUsage() {
  try {
    // 获取进程的内存信息
    const memoryInfo = process.memoryUsage();

    // 计算内存使用百分比
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = (usedMemory / totalMemory) * 100;

    return {
      memoryInfo,
      memoryUsagePercentage,
    };
  } catch (error) {
    console.error('Error analyzing memory usage:', error);
    throw error;
  }
}

/**
 * 打印内存使用情况
 * @param {Object} memoryUsage - 内存使用情况对象
 */
function printMemoryUsage(memoryUsage) {
  console.log('Memory Usage Analysis:');
  console.log(`RSS (Resident Set Size): ${memoryUsage.memoryInfo.rss} bytes`);
  console.log(`Heap Used: ${memoryUsage.memoryInfo.heapUsed} bytes`);
  console.log(`Heap Total: ${memoryUsage.memoryInfo.heapTotal} bytes`);
  console.log(`Memory Usage Percentage: ${memoryUsage.memoryUsagePercentage.toFixed(2)}%`);
}

// 主函数，用于执行内存使用分析并打印结果
function main() {
  try {
    const memoryUsage = analyzeMemoryUsage();
    printMemoryUsage(memoryUsage);
  } catch (error) {
    console.error('Failed to analyze memory usage:', error);
  }
}

// 执行主函数
main();