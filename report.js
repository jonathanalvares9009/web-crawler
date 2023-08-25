const fs = require('fs');
const path = require('path');


function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);
  return pagesArray;
}

function printReport(pages) {
  const sortedPages = sortPages(pages);
  console.log("==================");
  console.log("Report");
  console.log("Pages found with their number of occurrences: ");
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to ${page[0]}`);
  }
  console.log("==================");
}

function saveReport(fileName, pages) {
  const outputFolder = 'output';
  // Create the output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
  }

  const outputFile = path.join(outputFolder, `${fileName}.txt`);
  fs.writeFileSync(outputFile, Object.keys(pages).join("\n"), 'utf-8');
}

module.exports = { sortPages, printReport, saveReport };
