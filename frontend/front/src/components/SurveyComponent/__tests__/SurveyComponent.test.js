import * as router from "react-router";
import * as apiSlice from "../../../api/apiSlice";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // <-- Add MemoryRouter
import {
  buildDefaultDataFromSurveyStructure,
  buildSurveyCacheKey,
} from "../../../util/surveyUtils";

import React from "react";
import homes from "../../../../../jsonserver/data/homes_index.json";
import surveys from "../../../../../jsonserver/data/survey_index.json";
import SurveyComponent from "../SurveyComponent";

const DEFAULT_TEST_SURVEY = surveys[0];
const DEFAULT_TEST_HOME = homes[0];
const DEFAULT_TEST_SURVEY_CACHE_KEY = buildSurveyCacheKey(
  DEFAULT_TEST_SURVEY.id,
  DEFAULT_TEST_HOME.id
);
const DEFAULT_TEST_DEFAULT_SURVEY_DATA =
  buildDefaultDataFromSurveyStructure(DEFAULT_TEST_SURVEY);
const DEFAULT_TEST_LANG_PREF = "en";
const EXPECTED_TEST_SURVEY_OPTIONS = ["online", "offline"];
const DEFAULT_TEST_SURVEY_MODE = "online";

describe("SurveyComponent", () => {
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => jest.fn());

    jest
      .spyOn(apiSlice, "useGetSurveyStructureQuery")
      .mockImplementation(({ id, langPref, surveyMode }) => {
        const survey = surveys.find((s) => `${s.id}` === `${id}`);
        if (
          !langPref ||
          !surveyMode ||
          langPref !== DEFAULT_TEST_LANG_PREF ||
          !EXPECTED_TEST_SURVEY_OPTIONS.includes(surveyMode)
        ) {
          return {
            error: true,
            isError: true,
            isLoading: false,
            data: undefined,
          };
        }
        return {
          data: survey,
          error: !survey,
          isError: !survey,
          isLoading: false,
        };
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
      <MemoryRouter>
        <SurveyComponent
          langPref="en"
          surveyMode="online"
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
        />
      </MemoryRouter>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("3").querySelector("input")).toHaveAttribute(
      "value",
      "some text"
    );
  });

  it("should cache data when form is edited", () => {
    render(
      <MemoryRouter>
        <SurveyComponent
          langPref="en"
          surveyMode="online"
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
        />
      </MemoryRouter>
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
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const mockSubmit = jest.fn(async () =>
      Promise.resolve({ data: "success!" })
    );

    render(
      <MemoryRouter>
        <SurveyComponent
          langPref="en"
          surveyMode="online"
          submitSurvey={mockSubmit}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
        />
      </MemoryRouter>
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
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const mockSubmit = jest.fn(() => Promise.resolve({ error: "oh no!" }));

    render(
      <MemoryRouter>
        <SurveyComponent
          langPref="en"
          surveyMode="online"
          submitSurvey={mockSubmit}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
        />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(localStorage.getItem(DEFAULT_TEST_SURVEY_CACHE_KEY)).toBeTruthy();
  });

  it("no errors when rendering", () => {
    const errSpy = jest.spyOn(console, "error");

    const { container } = render(
      <MemoryRouter>
        <SurveyComponent
          langPref="en"
          surveyMode="online"
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
        />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("should show error message when langPref is missing", () => {
    render(
      <MemoryRouter>
        <SurveyComponent
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
          surveyMode={DEFAULT_TEST_SURVEY_MODE}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Encountered an error while loading the survey.")
    ).toBeInTheDocument();
  });

  it("should show error message when langPref is incorrect", () => {
    render(
      <MemoryRouter>
        <SurveyComponent
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
          surveyMode={DEFAULT_TEST_SURVEY_MODE}
          langPref="fr"
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Encountered an error while loading the survey.")
    ).toBeInTheDocument();
  });

  it("should show error message when surveyMode is missing", () => {
    render(
      <MemoryRouter>
        <SurveyComponent
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
          langPref={DEFAULT_TEST_LANG_PREF}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Encountered an error while loading the survey.")
    ).toBeInTheDocument();
  });

  it("should show error message when surveyMode is not in allowed options", () => {
    render(
      <MemoryRouter>
        <SurveyComponent
          submitSurvey={jest.fn()}
          isLoading={false}
          activeHome={DEFAULT_TEST_HOME}
          surveyId={DEFAULT_TEST_SURVEY.id}
          formSpacing={5}
          langPref={DEFAULT_TEST_LANG_PREF}
          surveyMode="invalid_mode"
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Encountered an error while loading the survey.")
    ).toBeInTheDocument();
  });
});
