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

it("should format JSP Scriptlet tag", () => {
  expect(format('<%@ page   contentType = "text/html"   %>')).toBe(
    '<%@ page contentType="text/html" %>' + EOF
  );
});

it("should format JSP Comments", () => {
  expect(format("<%--   This is JSP comment   --%>")).toBe(
    "<%-- This is JSP comment --%>" + EOF
  );
  expect(format("<!--   It was a HTML comment   -->")).toBe(
    "<%-- It was a HTML comment --%>" + EOF
  );
});
