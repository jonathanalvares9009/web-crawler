const { normaliseUrl } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normaliseUrl strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normaliseUrl strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normaliseUrl strip capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("normaliseUrl strip http protocol", () => {
  const input = "http://BLOG.boot.dev/path/";
  const actual = normaliseUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});
