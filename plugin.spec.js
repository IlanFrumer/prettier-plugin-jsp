// @ts-check
const prettier = require("prettier");
const plugin = require("./plugin");

/**
 * @param {string} text
 * @returns {string}
 */
const format = (text) =>
  prettier.format(text, {
    parser: "jsp",
    plugins: [plugin],
    pluginSearchDirs: false,
  });

const EOF = "\n";

/**
 * @param {string} text
 * @param {string} toBe
 */
const expectFormat = (text, toBe) => {
  expect(format(text)).toBe(toBe + EOF);
};

it("should format JSP Scriptlet tag", () => {
  expectFormat(
    '<%@ page   contentType = "text/html"   %>',
    '<%@ page contentType="text/html" %>'
  );
});

it("should format JSP Comments", () => {
  expectFormat(
    "<%--   This is JSP comment   --%>",
    "<%-- This is JSP comment --%>"
  );
  expectFormat(
    "<!--   It was a HTML comment   -->",
    "<%-- It was a HTML comment --%>"
  );
});

it("should format Self-Closing tags", () => {
  expectFormat(
    '<link rel="stylesheet" href="${commonResourcePath}/style.css">',
    '<link rel="stylesheet" href="${commonResourcePath}/style.css" />'
  );

  expectFormat("<br>", "<br />");
  expectFormat("<hr>", "<hr />");
  expectFormat(
    '<img    src="${commonResourcePath}/image.png" \n>',
    '<img src="${commonResourcePath}/image.png" />'
  );
});