import React from "react";
import { render } from "@testing-library/react";
import { AdminSurvey, PublicSurvey, SurveyorSurvey } from "../SurveyComponent";
import * as apiSlice from "../../../redux/apiSlice";
import surveyStructure from "../../../dummyData/survey_show.json";

describe("SurveyComponent", () => {
  // overwrite recaptcha key for testing purposes
  process.env.REACT_APP_RECAPTCHA_KEY = "RECAPTCHA_KEY";

  const mockSurveyStructure = jest.spyOn(
    apiSlice,
    "useGetSurveyStructureQuery"
  );

  it("snapshot test, public", () => {
    mockSurveyStructure.mockImplementation(() => ({
      data: surveyStructure,
    }));

    expect(render(<PublicSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, surveyor", () => {
    mockSurveyStructure.mockImplementation(() => ({
      data: surveyStructure,
    }));

    expect(render(<SurveyorSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, admin", () => {
    mockSurveyStructure.mockImplementation(() => ({
      data: surveyStructure,
    }));

    expect(render(<AdminSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, error message", () => {
    mockSurveyStructure.mockImplementation(() => ({
      error: "There was an error!",
    }));

    expect(render(<PublicSurvey />, {})).toMatchSnapshot();
  });

  it("snapshot test, loading", () => {
    mockSurveyStructure.mockImplementation(() => ({}));

    expect(render(<PublicSurvey />, {})).toMatchSnapshot();
  });
});
