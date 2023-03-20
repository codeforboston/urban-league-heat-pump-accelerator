import React from "react";
import { render } from "@testing-library/react";
import { AdminSurvey, PublicSurvey, SurveyorSurvey } from "../SurveyComponent";

describe("SurveyComponent", () => {
  // overwrite recaptcha key for testing purposes
  process.env.REACT_APP_RECAPTCHA_KEY = "RECAPTCHA_KEY";

  it("snapshot test, public", () => {
    expect(render(<PublicSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, surveyor", () => {
    expect(render(<SurveyorSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, admin", () => {
    expect(render(<AdminSurvey />, {})).toMatchSnapshot();
  });
});
