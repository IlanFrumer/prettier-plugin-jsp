const SINGLE_QM = "'";
const DOUBLE_QM = '"';
const RIGHT_SINGLE_QM = "’";
const RIGHT_DOUBLE_QM = "”";
const SINGLE_QM_REGEX = new RegExp(SINGLE_QM, "g");
const DOUBLE_QM_REGEX = new RegExp(DOUBLE_QM, "g");
const RIGHT_SINGLE_QM_REGEX = new RegExp(RIGHT_SINGLE_QM, "g");
const RIGHT_DOUBLE_QM_REGEX = new RegExp(RIGHT_DOUBLE_QM, "g");

const escapeQuotationMarks = (/** @type {string} */ text) => {
  if (text == null) return "";
  return text
    .replace(SINGLE_QM_REGEX, RIGHT_SINGLE_QM)
    .replace(DOUBLE_QM_REGEX, RIGHT_DOUBLE_QM);
};

const unescapeQuotationMarks = (/** @type {string} */ text) => {
  if (text == null) return null;
  return text
    .replace(RIGHT_SINGLE_QM_REGEX, SINGLE_QM)
    .replace(RIGHT_DOUBLE_QM_REGEX, DOUBLE_QM);
};

module.exports = {
  escape: escapeQuotationMarks,
  unescape: unescapeQuotationMarks,
};
