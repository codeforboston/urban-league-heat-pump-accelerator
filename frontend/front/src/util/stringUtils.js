// given a sentence, get the first X words, lowercased and hyphenated
export const sentenceAsLink = (string) => {
  return string
    .split(" ")
    .slice(0, 10)
    .map((s) => s.replace(/[^\w\s]/g, "").toLowerCase())
    .join("-");
};

export const isEmailValid = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  if (/\s/.test(password)) {
    return { error: true, message: "Password cannot contain spaces." };
  }
  if (password.length < 6) {
    return { error: true, message: "Please enter at least 6 characters." };
  }
  const alphaNumericSpecial = /[^a-zA-Z0-9!@#$%^&*]/;
  if (alphaNumericSpecial.test(password)) {
    return {
      error: true,
      message: "Password can only contain alphanumeric or !@#$%^&* characters.",
    };
  }
};
