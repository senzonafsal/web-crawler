# Web Crawler CLI

This is a simple CLI tool built using Node.js to crawl web pages, extract image and link URLs, and save the results to a JSON file.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Usage

To use the web crawler CLI, follow these steps:

1. Open your terminal.
2. Navigate to the project directory.
3. Run the following command to start crawling:
   
node crawler.js <start_url> <depth>

or

npm start <start_url> <depth>

Replace `<start_url>` with the URL you want to start crawling from, and `<depth>` with the depth you want to crawl.

4. The results will be saved to a file named `results.json`.

## Example

To crawl a website with a starting URL `https://example.com` and a depth of `2`, you would run:

node crawler.js https://example.com 2

or

npm start https://example.com 2


## Dependencies

- [axios](https://www.npmjs.com/package/axios): For making HTTP requests.
- [cheerio](https://www.npmjs.com/package/cheerio): For HTML parsing.

## License

This project is licensed under the [ISC License](LICENSE).

## Author

Created by Afsal KH.

If you have any questions or suggestions, feel free to contact me at [senzonafsal@gmail.com].