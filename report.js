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

module.exports = { sortPages, printReport };
