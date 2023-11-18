import { render } from "@testing-library/react";
import React from "react";
import { useForm } from "react-hook-form";
import { HeatPumpTextField } from "../HeatPumpTextField";

const DEFAULT_FORM = { 1: "" };

const DEFAULT_FIELD = {
  id: 1,
  display_order: 1,
  text: "Enter some text!",
  response_type: "text",
};

const FormWrapper = ({ q }) => {
  const { control } = useForm({ defaultValues: DEFAULT_FORM });
  return (
    <HeatPumpTextField
      key={`q${q.id}`}
      control={control}
      name={`${q.id}`}
      label={q.question}
      {...q}
    />
  );
};

describe("HeatPumpTextField", () => {
  it("renders normally with default props", () => {
    const { container } = render(<FormWrapper q={DEFAULT_FIELD} />);

    expect(container).toMatchSnapshot();
  });

  it("renders as expected when disableFancyLabel=true", () => {
    const { container } = render(
      <FormWrapper q={{ ...DEFAULT_FIELD, disableFancyLabel: true }} />
    );

    expect(container).toMatchSnapshot();
  });
});
