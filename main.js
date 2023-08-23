const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length < 3) {
    console.log("No URL provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  const pages = await crawlPage(baseURL, baseURL, {});

  console.log("Pages found with their number of occurrences: ");
  for (const page in pages) {
    console.log(page + ": " + pages[page]);
  }
}

main();
