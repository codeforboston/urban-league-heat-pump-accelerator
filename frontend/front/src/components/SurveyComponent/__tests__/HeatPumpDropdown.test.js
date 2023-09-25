import { render } from "@testing-library/react";
import React from "react";
import { HeatPumpDropdown } from "../HeatPumpDropdown";
import { useForm } from "react-hook-form";

const YES_NO_FIELD = {
  id: 1,
  display_order: 1,
  text: "Have you heard of heat pumps?",
  response_type: "radio",
  response_options: ["Yes", "No"],
};

const DEFAULT_FORM = { 1: "" };

const FormWrapper = ({ q }) => {
  const { control } = useForm({ defaultValues: DEFAULT_FORM });
  return (
    <HeatPumpDropdown
      key={`q${q.id}`}
      control={control}
      name={`${q.id}`}
      label={q.text}
      options={q.response_options.map((o) => ({
        value: o,
        label: o,
      }))}
    />
  );
};

describe("HeatPumpDropdown", () => {
  it("renders as expected", () => {
    const { container } = render(<FormWrapper q={YES_NO_FIELD} />);

    expect(container).toMatchSnapshot();
  });
});
