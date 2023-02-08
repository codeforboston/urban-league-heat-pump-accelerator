import React from "react";
import { render } from "@testing-library/react";
import { SurveyPage } from "../SurveyPage";

describe("SurveyPage", () => {
  it("snapshot test", () => {
    expect(render(<SurveyPage />, {})).toMatchSnapshot();
  });
});
