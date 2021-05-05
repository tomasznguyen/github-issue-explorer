import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("<Pagination />", () => {
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

  it("renders correct number of buttons", () => {
    const data = [
      {
        page: 0,
        pages: 3,
        buttons: 3 + 2,
      },
      {
        page: 0,
        pages: 9,
        buttons: 9 + 2,
      },
      {
        page: 0,
        pages: 10,
        buttons: 7 + 2,
      },
      {
        page: 0,
        pages: 10,
        buttons: 7 + 2,
      },
      {
        page: 3,
        pages: 10,
        buttons: 8 + 2,
      },
      {
        page: 4,
        pages: 10,
        buttons: 9 + 2,
      },
      {
        page: 6,
        pages: 10,
        buttons: 8 + 2,
      },
      {
        page: 9,
        pages: 10,
        buttons: 7 + 2,
      },
    ];

    const onPageChange = jest.fn();

    const { rerender } = render(
      <Pagination page={0} pages={9} onPageChange={onPageChange} />
    );

    for (const testData of data) {
      rerender(
        <Pagination
          page={testData.page}
          pages={testData.pages}
          onPageChange={onPageChange}
        />
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(testData.buttons);
    }
  });
});
