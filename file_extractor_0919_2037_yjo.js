// 代码生成时间: 2025-09-19 20:37:05
const fs = require('fs-extra');
const path = require('path');
const extract = require('extract-zip');

/**
 * 文件解压工具
 * @param {string} sourcePath - 需要解压的文件路径
 * @param {string} destinationPath - 解压后的目标路径
 * @returns {Promise<void>} - 一个Promise，表示解压操作的完成
 */
function extractFile(sourcePath, destinationPath) {
  // 检查源文件是否存在
  return fs.pathExists(sourcePath)
    .then((exists) => {
      if (!exists) {
        throw new Error(`The source file at ${sourcePath} does not exist.`);
      }
      // 使用extract-zip模块进行解压
      return extract(sourcePath, { dir: destinationPath });
    }).then(() => {
      console.log('Extraction complete.');
    }).catch((error) => {
      console.error('Extraction failed:', error);
    });
}

/**
 * 程序入口
 * @param {string} arg1 - 命令行参数1：需要解压的文件路径
 * @param {string} arg2 - 命令行参数2：解压后的目标路径
 */
function main(arg1, arg2) {
  try {
    if (!arg1 || !arg2) {
      throw new Error('Usage: node file_extractor.js <sourcePath> <destinationPath>');
    }
    extractFile(arg1, arg2);
  } catch (error) {
    console.error(error.message);
  }
}

// 检查是否是作为主模块执行
if (require.main === module) {
  main(process.argv[2], process.argv[3]);
}
