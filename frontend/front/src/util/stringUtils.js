// given a sentence, get the first X words, lowercased and hyphenated
export const sentenceAsLink = (string) => {
  return string
    .split(" ")
    .slice(0, 10)
    .map((s) => s.replace(/[^\w\s]/g, "").toLowerCase())
    .join("-");
};