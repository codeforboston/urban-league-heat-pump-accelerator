import React from "react";
import { SurveyPage } from "../SurveyPage";
import { render, screen } from "@testing-library/react";
import * as apiSlice from "../../../../api/apiSlice";
import { mockNullMutation } from "../../../../util/testUtils";

describe("Public Survey Page", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest
      .spyOn(apiSlice, "useCreateHomeMutation")
      .mockImplementation(mockNullMutation);
    jest
      .spyOn(apiSlice, "useCreateSurveyVisitMutation")
      .mockImplementation(mockNullMutation);
    jest
      .spyOn(apiSlice, "useGetSurveyStructureQuery")
      .mockImplementation(() => ({}));

    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("displays correct message when REACT_APP_PUBLIC_SURVEY_ENABLED=undefined", () => {
    delete process.env.REACT_APP_PUBLIC_SURVEY_ENABLED;

    render(<SurveyPage />);

    expect(
      screen.getByTestId("publicSurveyUnderConstruction")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("publicSurveyInfoMessage")
    ).not.toBeInTheDocument();
  });

  it("displays correct message when REACT_APP_PUBLIC_SURVEY_ENABLED=false", () => {
    process.env.REACT_APP_PUBLIC_SURVEY_ENABLED = "false";

    render(<SurveyPage />);

    expect(
      screen.getByTestId("publicSurveyUnderConstruction")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("publicSurveyInfoMessage")
    ).not.toBeInTheDocument();
  });

  it("displays the survey page when REACT_APP_PUBLIC_SURVEY_ENABLED=true", () => {
    process.env.REACT_APP_PUBLIC_SURVEY_ENABLED = "true";

    render(<SurveyPage />);

    expect(screen.getByTestId("publicSurveyInfoMessage")).toBeInTheDocument();
    expect(
      screen.queryByTestId("publicSurveyUnderConstruction")
    ).not.toBeInTheDocument();
  });
});
