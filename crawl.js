const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normaliseCurrentURL = normaliseUrl(currentURL);
  if (pages[normaliseCurrentURL] > 0) {
    pages[normaliseCurrentURL]++;
    return pages;
  }

  pages[normaliseCurrentURL] = 1;
  console.log("Crawling: " + currentURL);

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        "Error in fetch: " + response.status + ", on URL: " + baseURL
      );
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log("Not HTML: " + contentType + ", on URL: " + baseURL);
      return pages;
    }
    const htmlBody = await response.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log("Error in fetch: " + error + ", on URL: " + url);
  }
  return pages;
}

function getURLsFromHTML(body, baseURL) {
  const urls = [];
  const jsdom = new JSDOM(body);
  const links = jsdom.window.document.querySelectorAll("a");
  links.forEach((link) => {
    if (link.href.startsWith("/")) {
      // relative URL
      try {
        const url = new URL(baseURL + link.href);
        urls.push(url.href);
      } catch (error) {
        console.log("Error in the relative URL: " + error);
      }
    } else {
      try {
        const url = new URL(link.href);
        urls.push(url.href);
      } catch (error) {
        console.log("Error in the absolute URL: " + error);
      }
    }
  });
  return urls;
}

function normaliseUrl(urlString) {
  const url = new URL(urlString);
  const hostPath = url.host + url.pathname;
  if (hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  getURLsFromHTML,
  normaliseUrl,
  crawlPage,
};
