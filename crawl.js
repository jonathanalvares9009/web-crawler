const { JSDOM } = require("jsdom");

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
};
