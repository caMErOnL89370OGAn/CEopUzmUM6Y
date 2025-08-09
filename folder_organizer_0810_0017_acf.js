// 代码生成时间: 2025-08-10 00:17:55
// folder_organizer.js
// This script is designed to organize a specified directory by sorting its contents.
// It will move all files into their respective subdirectories based on file extension.

const fs = require('fs');
const path = require('path');

// Function to create a directory if it does not exist
function createDirectoryIfNotExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.error('Error creating directory:', error);
        process.exit(1);
    }
}

// Function to move a file to a directory based on its extension
function moveFileToDirectory(file, targetDir) {
    try {
        const src = path.join(process.cwd(), file);
        const dest = path.join(targetDir, file);
        fs.renameSync(src, dest);
        console.log(`Moved ${file} to ${targetDir}`);
    } catch (error) {
        console.error('Error moving file:', error);
        process.exit(1);
    }
}

// Main function to organize the directory
function organizeDirectory(directory) {
    try {
        if (!fs.existsSync(directory)) {
            console.error('The specified directory does not exist.');
            process.exit(1);
        }

        const files = fs.readdirSync(directory); // Read all files in the directory

        files.forEach(file => {
            const fileStats = fs.statSync(path.join(directory, file));
            if (fileStats.isFile()) {
                const extension = path.extname(file).substring(1); // Get the file extension without the dot
                const targetDir = path.join(directory, extension); // Directory name as the file extension

                createDirectoryIfNotExists(targetDir); // Ensure the target directory exists
                moveFileToDirectory(file, targetDir); // Move the file to the target directory
            }
        });
    } catch (error) {
        console.error('Error organizing directory:', error);
        process.exit(1);
    }
}

// Entry point of the script
function main() {
    // Check if the script was run with a directory argument
    if (process.argv.length !== 3) {
        console.error('Usage: node folder_organizer.js <directory_path>');
        process.exit(1);
    }

    const targetDirectory = process.argv[2];
    organizeDirectory(targetDirectory);
}

main();