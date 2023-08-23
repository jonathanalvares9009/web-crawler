function normaliseUrl(urlString) {
  const url = new URL(urlString);
  const hostPath = url.host + url.pathname;
  if (hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normaliseUrl,
};
