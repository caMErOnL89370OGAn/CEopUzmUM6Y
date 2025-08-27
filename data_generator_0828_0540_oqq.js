// 代码生成时间: 2025-08-28 05:40:04
// Import necessary Node.js modules
const fs = require('fs');
const path = require('path');

// Define the Data Generator class
class DataGenerator {
    /**
     * Generates a random integer within a specified range.
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random integer within the range.
     */
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random string of a specified length.
     * @param {number} length - The desired length of the string.
     * @returns {string} A random string.
     */
    static randomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(DataGenerator.randomInt(0, characters.length - 1));
        }
        return result;
    }

    /**
     * Generates a mock user object.
     * @returns {object} A mock user object with random properties.
     */
    static mockUser() {
        return {
            id: DataGenerator.randomInt(1000, 9999),
            username: DataGenerator.randomString(10),
            email: DataGenerator.randomString(10) + '@example.com',
            password: DataGenerator.randomString(12)
        };
    }

    /**
     * Writes generated data to a file.
     * @param {string} filename - The name of the file to write to.
     * @param {object} data - The data to write to the file.
     * @returns {Promise} A promise that resolves when the file is written.
     */
    static writeDataToFile(filename, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Data written to ${filename}`);
                }
            });
        });
    }
}

// Example usage of the DataGenerator
async function generateAndSaveTestData() {
    try {
        // Generate mock data
        const userData = DataGenerator.mockUser();

        // Define the output file path
        const outputFilePath = path.join(__dirname, 'test_data.json');

        // Write the mock data to a file
        const result = await DataGenerator.writeDataToFile(outputFilePath, userData);
        console.log(result);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('An error occurred:', error);
    }
}

// Run the example function
generateAndSaveTestData();