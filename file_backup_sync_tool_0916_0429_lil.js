// 代码生成时间: 2025-09-16 04:29:58
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify fs methods for easier use with async/await
const { copyFile, readdir, exists, mkdir, rmdir, readFile, writeFile } = fs.promises;

// Helper function to recursively read directory contents
async function readDirectoryContents(dir) {
    let files = [];
    for await (const dirent of await opendir(dir)) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            files = [...files, ...(await readDirectoryContents(res))];
        } else {
            files.push(res);
        }
    }
    return files;
}

// Helper function to copy a single file
async function copySingleFile(src, dest) {
    try {
        await copyFile(src, dest);
        console.log(`File ${src} copied to ${dest}`);
    } catch (err) {
        console.error(`Error copying file ${src}: ${err.message}`);
    }
}

// Helper function to remove directory and its contents
async function removeDirectory(dir) {
    try {
        await rmdir(dir, { recursive: true });
        console.log(`Directory ${dir} removed`);
    } catch (err) {
        console.error(`Error removing directory ${dir}: ${err.message}`);
    }
}

// The main function for syncing files from source to destination
async function syncFiles(srcDir, destDir) {
    if (!(await exists(srcDir))) {
        console.error(`Source directory ${srcDir} does not exist`);
        return;
    }

    try {
        // Create destination directory if it does not exist
        await mkdir(destDir, { recursive: true });

        const srcFiles = await readDirectoryContents(srcDir);
        const destFiles = await readdir(destDir, { withFileTypes: true });

        // Remove files in destination that are not in source
        for (const file of destFiles) {
            if (!srcFiles.includes(path.join(srcDir, file.name))) {
                const destFilePath = path.join(destDir, file.name);
                await removeDirectory(destFilePath) || await unlink(destFilePath);
            }
        }

        // Copy files from source to destination
        for (const file of srcFiles) {
            const relativePath = path.relative(srcDir, file);
            const destFilePath = path.join(destDir, relativePath);
            await copySingleFile(file, destFilePath);
        }

        console.log(`Sync completed: ${srcDir} -> ${destDir}`);
    } catch (err) {
        console.error(`Sync error: ${err.message}`);
    }
}

// Usage example
const sourceDirectory = './source/';
const destinationDirectory = './destination/';
syncFiles(sourceDirectory, destinationDirectory);