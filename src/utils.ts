import { transliterate } from "transliteration"

export const titleCase = (str: string) => {
  const sentence = str.toLowerCase().split(" ");
  return sentence.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

const QUESTION_REGEX = /^(what|where|when|who)/i;

export const isQuestion = (str: string) => str.trim().match(QUESTION_REGEX);

export const normalizeText = (str: string) =>
  transliterate(str)
    .replace(QUESTION_REGEX, "")
    .replace(/[.'"“”‘’_-]/, "")
    .replace(/^\s*(is|are|was|were|s) /, "")
    .replace(/^\s*(the|a|an) /i, "")
    .replace(/\s+(&amp;|&|and)\s+/i, " ")
    .replace(/\?+$/, "")
    .trim()
    .toLowerCase();