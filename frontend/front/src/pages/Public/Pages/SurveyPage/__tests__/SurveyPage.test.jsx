import React from "react";
import { render } from "@testing-library/react";
import { SurveyPage } from "../SurveyPage";

describe("SurveyPage", () => {
  // overwrite recaptcha key for testing purposes
  process.env.REACT_APP_RECAPTCHA_KEY = "RECAPTCHA_KEY";

  it("snapshot test", () => {
    expect(render(<SurveyPage />, {})).toMatchSnapshot();
  });
});
