const { JSDOM } = require("jsdom");

async function crawlPage(url) {
  try {
    const response = await fetch(url);
    if (response.status > 399) {
      console.log("Error in fetch: " + response.status + ", on URL: " + url);
      return;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log("Not HTML: " + contentType + ", on URL: " + url);
      return;
    }
    console.log("Response text " + (await response.text()));
  } catch (error) {
    console.log("Error in fetch: " + error + ", on URL: " + url);
  }
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
