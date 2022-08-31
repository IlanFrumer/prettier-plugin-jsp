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

it("should format custom tags", () => {
  expectFormat(
    '<c:if test="${not empty uncompress}">\n<br><hr>\n</c:if>',
    '<c:if test="${not empty uncompress}">\n  <br />\n  <hr />\n</c:if>'
  );

  expectFormat("<multi-checkout />", "<multi-checkout />");
  expectFormat("<multi-checkout:do />", "<multi-checkout:do />");
});

it("should format interpolated attributes", () => {
  expectFormat(
    `<img src='\${a ? 'b' : null}/image.png' />`,
    `<img src="\${a ? 'b' : null}/image.png" />`
  );

  expectFormat(
    `<option class='test' \${empty selected ? 'selected' : ''}>value</option>`,
    `<option class="test" \${empty selected ? 'selected' : ''}>value</option>`
  );

  expectFormat(
    `<div class="page-wrap \${opticsProduct ? 'optic-product' : '' }"></div>`,
    `<div class="page-wrap \${opticsProduct ? 'optic-product' : '' }"></div>`
  );
});
