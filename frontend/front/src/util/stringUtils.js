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

export const validatePhoneNumber = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  if (
    (digitsOnly.length === 11 && digitsOnly.startsWith("1")) ||
    digitsOnly.length === 10
  ) {
    const validCharacters = /^[0-9()\-\s]+$/;
    if (validCharacters.test(value)) {
      return true;
    }
  }

  return "Invalid phone number format";
};

export const validateZipCode = (value) => {
  const zipPattern = /^\d{5}(-\d{4})?$/;
  if (!zipPattern.test(value)) {
    return "Invalid zip code format";
  }
  return true;
};
