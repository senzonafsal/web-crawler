const fs = require("fs"); // File System module
const axios = require("axios"); // Axios module for making HTTP requests
const cheerio = require("cheerio"); // Cheerio library for HTML parsing

const startUrl = process.argv[2]; // Starting URL from CLI Arguments
const depth = parseInt(process.argv[3]); // Depth from CLI Arguments
const results = []; // Array to store the results

// Function to crawl web pages
async function crawl(url, currentDepth) {
	if (currentDepth > depth) {
		return; // Stop crawling when depth limit is reached
	}

	console.log(`Crawling ${url}. Depth is ${currentDepth}/${depth}`);

	try {
		// Fetch the webpage content from the given URL
		const { data } = await axios.get(url);
		const $ = cheerio.load(data); // Load the HTML content for parsing

		// Function to extract URLs from a specific HTML element and attribute
		const extractUrls = (selector, attribute) =>
			$(selector)
				.map((_, el) => $(el).attr(attribute))
				.get();

		const images = extractUrls("img", "src");
		const links = extractUrls("a[href^='http']", "href");

		// Create an array of promises for crawling images and links
		const promises = [...images, ...links].map((url) =>
        	crawl(url, currentDepth + 1)
		);

		// Wait for all promises to complete before moving on
		await Promise.all(promises);

		// Push images and their metadata into the results array
		results.push(
			...images.map((imageUrl) => ({
				imageUrl,
				sourceUrl: url,
				depth: currentDepth,
			}))
		);
	} catch (error) {
		console.error(`Error crawling ${url}: ${error.message}`);
	}
}

// Main entry point: Immediately-invoked async function to start crawling
(async () => {
	try {
		await crawl(startUrl, 0); // Start crawling from the provided start URL
		fs.writeFileSync("results.json", JSON.stringify({ results }, null, 2)); // Save results to JSON file
		console.log("Crawling completed! Results saved to results.json.");
	} catch (err) {
		console.error("Crawling failed:", err);
	}
})();
