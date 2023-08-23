const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

test("sortPages 3 pages", () => {
  const input = {
    "https://blog.boot.dev/path1": 1,
    "https://blog.boot.dev/path2": 2,
    "https://blog.boot.dev/path3": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.boot.dev/path3", 3],
    ["https://blog.boot.dev/path2", 2],
    ["https://blog.boot.dev/path1", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 7 pages", () => {
  const input = {
    "https://blog.boot.dev/path1": 1,
    "https://blog.boot.dev/path2": 5,
    "https://blog.boot.dev/path3": 3,
    "https://blog.boot.dev/path4": 2,
    "https://blog.boot.dev/path5": 4,
    "https://blog.boot.dev/path6": 6,
    "https://blog.boot.dev/path7": 7,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.boot.dev/path7", 7],
    ["https://blog.boot.dev/path6", 6],
    ["https://blog.boot.dev/path2", 5],
    ["https://blog.boot.dev/path5", 4],
    ["https://blog.boot.dev/path3", 3],
    ["https://blog.boot.dev/path4", 2],
    ["https://blog.boot.dev/path1", 1],
  ];
  expect(actual).toEqual(expected);
});
