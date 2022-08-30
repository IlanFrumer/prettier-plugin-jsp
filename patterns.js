const selfClosing = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

module.exports = {
  selfClosing: new RegExp(`<(${selfClosing.join("|")})([^>]*?)\\/?>`, "gi"),
};
