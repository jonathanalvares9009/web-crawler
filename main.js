const { crawlPage } = require("./crawl");
const { printReport, saveReport } = require("./report");
const fs = require('fs');

async function main() {
  if (process.argv.length < 3) {
    console.log("No URL provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }

  if (process.argv[2] === "--yc-companies") {
    fs.readFile('output/yc_companies.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const urls = data.split('\n');
      urls.forEach(async (url) => {
        if (url === '') {
          return;
        }
        const pages = await crawlPage(url, url, {});
        const fileName = new URL(url).hostname.split('.')[0];
        saveReport(fileName, pages);
        printReport(pages);
      });
    });
  } else {
    const baseURL = process.argv[2];
    const pages = await crawlPage(baseURL, baseURL, {});

    const fileName = new URL(baseURL).hostname.split('.')[0];
    saveReport(fileName, pages);
    printReport(pages);
  }
}

main();
