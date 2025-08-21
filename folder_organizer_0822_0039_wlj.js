// 代码生成时间: 2025-08-22 00:39:00
const fs = require('fs');
const path = require('path');

/**
 * 函数：整理文件夹结构
 * @param {string} sourcePath - 需要整理的文件夹路径
 * @param {string} targetPath - 目标文件夹路径
 * @returns {void}
 */
function organizeFolders(sourcePath, targetPath) {
  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      console.error('读取文件夹失败:', err);
      return;
    }
    files.forEach(file => {
      const filePath = path.join(sourcePath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('获取文件状态失败:', err);
          return;
        }
        if (stats.isDirectory()) {
          const targetDirPath = path.join(targetPath, file);
          if (!fs.existsSync(targetDirPath)) {
            fs.mkdirSync(targetDirPath);
          }
          organizeFolders(filePath, targetDirPath);
        }
      });
    });
  });
}

/**
 * 主函数：
 * 负责调用整理函数，并处理命令行参数
 */
function main() {
  if (process.argv.length < 4) {
    console.error('请提供源目录和目标目录路径');
    return;
  }
  const sourcePath = process.argv[2];
  const targetPath = process.argv[3];
  try {
    if (!fs.statSync(sourcePath).isDirectory()) {
      throw new Error('源路径不是一个有效的目录');
    }
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath);
    }
    organizeFolders(sourcePath, targetPath);
  } catch (err) {
    console.error(err.message);
  }
}

// 程序入口点
main();