import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("<Pagination />", () => {
  it("renders 5 buttons", () => {
    const onPageChange = jest.fn();

    render(<Pagination page={0} pages={3} onPageChange={onPageChange} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("lets first button to fire correct page", () => {
    const onPageChange = jest.fn();

    render(<Pagination page={2} pages={3} onPageChange={onPageChange} />);

    let buttons = screen.getAllByRole("listitem");
    userEvent.click(buttons[0]);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("lets page 2 button to fire correct page", () => {
    const onPageChange = jest.fn();

    render(<Pagination page={0} pages={3} onPageChange={onPageChange} />);

    let buttons = screen.getAllByRole("listitem");
    userEvent.click(buttons[2]);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("lets last button to fire correct page", () => {
    const onPageChange = jest.fn();

    render(<Pagination page={0} pages={3} onPageChange={onPageChange} />);

    let buttons = screen.getAllByRole("listitem");
    userEvent.click(buttons[buttons.length - 1]);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
