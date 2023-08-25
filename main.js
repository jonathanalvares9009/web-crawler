const { crawlPage } = require("./crawl");
const { printReport, saveReport } = require("./report");

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

  const fileName = new URL(baseURL).hostname.split('.')[0];
  saveReport(fileName, pages);

  printReport(pages);
}

main();
