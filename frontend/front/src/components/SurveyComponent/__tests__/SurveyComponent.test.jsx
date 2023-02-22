import React from "react";
import { render } from "@testing-library/react";
import { SurveyComponent } from "../SurveyComponent";

describe("SurveyPage", () => {
  // overwrite recaptcha key for testing purposes
  process.env.REACT_APP_RECAPTCHA_KEY = "RECAPTCHA_KEY";

  it("snapshot test, public", () => {
    expect(render(<SurveyComponent />, {})).toMatchSnapshot();
  });

  it("snapshot test, surveyor", () => {
    expect(render(<SurveyComponent isSurveyor />, {})).toMatchSnapshot();
  });
});
