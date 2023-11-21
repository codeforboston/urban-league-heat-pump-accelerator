import * as apiSlice from "../../../api/apiSlice";
import * as router from "react-router";

import {
  buildDefaultDataFromSurveyStructure,
  buildSurveyCacheKey,
} from "../../../util/surveyUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import SurveyComponent from "../SurveyComponent";
import homes from "../../../../../jsonserver/data/homes_index.json";
import surveys from "../../../../../jsonserver/data/survey_index.json";

const DEFAULT_TEST_SURVEY = surveys[0];
const DEFAULT_TEST_HOME = homes[0];
const DEFAULT_TEST_SURVEY_CACHE_KEY = buildSurveyCacheKey(
  DEFAULT_TEST_SURVEY.id,
  DEFAULT_TEST_HOME.id
);
const DEFAULT_TEST_DEFAULT_SURVEY_DATA =
  buildDefaultDataFromSurveyStructure(DEFAULT_TEST_SURVEY);

describe("SurveyComponent", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => jest.fn());

    jest
      .spyOn(apiSlice, "useGetSurveyStructureQuery")
      .mockImplementation((id) => {
        const survey = surveys.find((s) => `${s.id}` === `${id}`);
        return { data: survey, error: !survey };
      });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should load from cache if available", () => {
    localStorage.setItem(
      DEFAULT_TEST_SURVEY_CACHE_KEY,
      JSON.stringify({
        ...DEFAULT_TEST_DEFAULT_SURVEY_DATA,
        3: "some text",
      })
    );

    render(
      <SurveyComponent
        submitSurvey={jest.fn()}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
      />,
      {}
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("3").querySelector("input")).toHaveAttribute(
      "value",
      "some text"
    );
  });

  it("cache should not be used for readonly survey", () => {
    localStorage.setItem(
      DEFAULT_TEST_SURVEY_CACHE_KEY,
      JSON.stringify({
        ...DEFAULT_TEST_DEFAULT_SURVEY_DATA,
        3: "some text",
      })
    );

    render(
      <SurveyComponent
        submitSurvey={jest.fn()}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
        readonly
      />,
      {}
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("3").querySelector("input")).not.toHaveAttribute(
      "value",
      "some text"
    );
  });

  it("should cache data when form is edited", () => {
    render(
      <SurveyComponent
        submitSurvey={jest.fn()}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
      />,
      {}
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "some text" },
    });

    expect(localStorage.getItem(DEFAULT_TEST_SURVEY_CACHE_KEY)).toBeTruthy();
    expect(localStorage.getItem(DEFAULT_TEST_SURVEY_CACHE_KEY)).toContain(
      "some text"
    );
  });

  it("should clear data when form is submitted", async () => {
    localStorage.setItem(
      DEFAULT_TEST_SURVEY_CACHE_KEY,
      JSON.stringify({
        ...DEFAULT_TEST_DEFAULT_SURVEY_DATA,
        3: "some text",
      })
    );

    const mockSubmit = jest.fn(() => Promise.resolve({ data: "success!" }));

    render(
      <SurveyComponent
        submitSurvey={mockSubmit}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
      />,
      {}
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(localStorage.getItem(DEFAULT_TEST_SURVEY_CACHE_KEY)).toBeFalsy();
  });

  it("should not clear data if form submission fails", async () => {
    localStorage.setItem(
      DEFAULT_TEST_SURVEY_CACHE_KEY,
      JSON.stringify({
        ...DEFAULT_TEST_DEFAULT_SURVEY_DATA,
        3: "some text",
      })
    );

    const mockSubmit = jest.fn(() => Promise.resolve({ error: "oh no!" }));

    render(
      <SurveyComponent
        submitSurvey={mockSubmit}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
      />,
      {}
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(localStorage.getItem(DEFAULT_TEST_SURVEY_CACHE_KEY)).toBeTruthy();
  });

  it("no errors when rendering", () => {
    const errSpy = jest.spyOn(console, "error");

    const { container } = render(
      <SurveyComponent
        submitSurvey={jest.fn()}
        isLoading={false}
        activeHome={DEFAULT_TEST_HOME}
        isEditable={false}
        surveyId={DEFAULT_TEST_SURVEY.id}
        formSpacing={5}
      />,
      {}
    );

    expect(container).toMatchSnapshot();
    expect(errSpy).not.toHaveBeenCalled();
  });
});
