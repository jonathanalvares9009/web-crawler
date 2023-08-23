const { normaliseUrl, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normaliseUrl strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normaliseUrl strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normaliseUrl strip capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `    <html>
        <body>
            <a href='https://blog.boot.dev/path/'>link</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualURLs = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedURLs = ["https://blog.boot.dev/path/"];
  expect(actualURLs).toEqual(expectedURLs);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `    <html>
        <body>
            <a href='/path/'>link</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualURLs = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedURLs = ["https://blog.boot.dev/path/"];
  expect(actualURLs).toEqual(expectedURLs);
});

test("getURLsFromHTML both absolute and relative URLs", () => {
  const inputHTMLBody = `    <html>
        <body>
        <a href='https://blog.boot.dev/path1/'>link 1</a>
            <a href='/path2/'>link 2</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualURLs = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedURLs = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actualURLs).toEqual(expectedURLs);
});

test("getURLsFromHTML bad URL", () => {
  const inputHTMLBody = `    <html>
        <body>
            <a href='path'>link</a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actualURLs = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expectedURLs = [];
  expect(actualURLs).toEqual(expectedURLs);
});
