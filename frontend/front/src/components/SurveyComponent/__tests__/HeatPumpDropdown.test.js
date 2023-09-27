import { fireEvent, render, screen, within } from "@testing-library/react";
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

const OTHER_FIELD_LABEL = "What's your favorite Pokemon?";
const OTHER_FIELD = {
  id: 1,
  display_order: 1,
  text: OTHER_FIELD_LABEL,
  response_type: "radio",
  response_options: ["Bulbasaur", "Other"],
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
      {...q}
    />
  );
};

describe("HeatPumpDropdown", () => {
  it("renders as expected", () => {
    const { container } = render(<FormWrapper q={YES_NO_FIELD} />);

    expect(container).toMatchSnapshot();
  });

  it("enableOtherField=true shows other field when 'other' is selected", () => {
    render(<FormWrapper q={{ ...OTHER_FIELD, enableOtherField: true }} />);

    fireEvent.mouseDown(screen.getByRole("button"));
    const options = within(screen.getByRole("listbox"));
    fireEvent.click(options.getByText("Other"));

    expect(screen.getByLabelText("Other...")).not.toBeNull();
  });

  it("enableOtherField=false hides other field when 'other' is selected", () => {
    render(<FormWrapper q={OTHER_FIELD} />);

    fireEvent.mouseDown(screen.getByRole("button"));
    const options = within(screen.getByRole("listbox"));
    fireEvent.click(options.getByText("Other"));

    expect(screen.queryByLabelText("Other...")).toBeNull();
  });

  it("disableFancyLabel=true renders different label", () => {
    const { container } = render(
      <FormWrapper q={{ ...YES_NO_FIELD, disableFancyLabel: true }} />
    );

    expect(container).toMatchSnapshot();
  });
});
