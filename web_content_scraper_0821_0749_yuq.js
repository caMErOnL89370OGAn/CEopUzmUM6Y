// 代码生成时间: 2025-08-21 07:49:27
const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Scrape content from a webpage
 * @param {string} url - The URL of the webpage to scrape
 * @param {string} outputFilePath - The path to save the scraped content
 */
async function scrapeWebContent(url, outputFilePath) {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the target URL
    await page.goto(url);

    // Get the page content
    const content = await page.content();

    // Close the browser
    await browser.close();

    // Save the content to a file
    fs.writeFileSync(outputFilePath, content);
    console.log(`Content scraped and saved to ${outputFilePath}`);
  } catch (error) {
    console.error('Failed to scrape web content:', error);
  }
}

// Example usage
const targetUrl = 'https://example.com';
const outputFilePath = 'output.html';
scrapeWebContent(targetUrl, outputFilePath);
