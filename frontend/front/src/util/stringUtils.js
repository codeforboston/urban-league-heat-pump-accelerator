// given a sentence, get the first X words, lowercased and hyphenated
export const sentenceAsLink = (string) => {
  return string
    .split(" ")
    .slice(0, 10)
    .map((s) => s.replace(/[^\w\s]/g, "").toLowerCase())
    .join("-");
};

// Mostly used to prepend 0xxxx zipcodes with a 0 instead of displaying as a 4 digit number.
export const formatZipcode = (zipCode) => {
  return zipCode.length === 5 ? zipCode : `0${zipCode}`;
};
