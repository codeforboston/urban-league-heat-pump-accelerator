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
      <MemoryRouter>
        <SurveyComponent
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
});
