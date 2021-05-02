import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IssueForm from "./IssueForm";

describe("<IssueForm />", () => {
  it("shows error message if fields are empty and button is clicked", () => {
    const onSubmit = jest.fn();

    render(<IssueForm onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole("button"));

    const errorMessages = screen.getAllByRole("alert");

    expect(errorMessages).toHaveLength(2);
  });

  it("does not call onSubmit if fields are empty and button is clicked", () => {
    const onSubmit = jest.fn();

    render(<IssueForm onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole("button"));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit if fields are not empty", () => {
    const onSubmit = jest.fn();

    render(<IssueForm onSubmit={onSubmit} />);

    userEvent.type(screen.getByLabelText(/organization/i), "org");
    userEvent.type(screen.getByLabelText(/repository/i), "repo");
    userEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalledWith("org", "repo");
  });
});
