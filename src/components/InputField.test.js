import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("<InputField />", () => {
  it("calls onChange on input change", () => {
    const onChange = jest.fn();

    render(<InputField id="test" label="Name" onChange={onChange} value="" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "react" } });

    expect(onChange).toHaveBeenCalledWith("react");
  });

  it("renders without error message", () => {
    const onChange = jest.fn();

    render(<InputField id="test" label="Name" onChange={onChange} value="" />);

    const errorMessage = screen.queryByRole("alert");

    expect(errorMessage).toBeNull();
  });

  it("renders error message", () => {
    const onChange = jest.fn();

    render(
      <InputField
        errorMessage="This field is required"
        id="test"
        label="Name"
        onChange={onChange}
        value=""
      />
    );

    const errorMessage = screen.getByRole("alert");

    expect(errorMessage).toHaveTextContent("This field is required");
  });
});
