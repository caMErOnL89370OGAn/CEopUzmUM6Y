// 代码生成时间: 2025-09-20 10:46:03
// data_backup_restore.js
// A program for data backup and restore using Node.js

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// Configuration for backup directory
const backupDir = './backup';

// Ensure backup directory exists
async function ensureBackupDirExists() {
  try {
    await mkdirAsync(backupDir, { recursive: true });
  } catch (error) {
    console.error('Error creating backup directory:', error);
    throw error;
  }
}

// Backup data function
async function backupData(filePath) {
  try {
    await ensureBackupDirExists();

    const backupPath = path.join(backupDir, `backup-${Date.now()}.json`);
    const data = await readFileAsync(filePath, 'utf8');
    await writeFileAsync(backupPath, data, 'utf8');
    console.log(`Data backed up to ${backupPath}`);
  } catch (error) {
    console.error('Error during backup:', error);
    throw error;
  }
}

// Restore data function
async function restoreData(backupFilePath, targetFilePath) {
  try {
    const backupPath = path.join(backupDir, backupFilePath);
    const data = await readFileAsync(backupPath, 'utf8');
    await writeFileAsync(targetFilePath, data, 'utf8');
    console.log(`Data restored from ${backupPath} to ${targetFilePath}`);
  } catch (error) {
    console.error('Error during restore:', error);
    throw error;
  }
}

// Usage example
(async () => {
  try {
    // Replace './data.json' with the path to the file you want to backup
    await backupData('./data.json');

    // Replace 'backup-example.json' with the name of the backup file you want to restore
    // Replace './restored_data.json' with the path to the file you want to restore to
    await restoreData('backup-example.json', './restored_data.json');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
