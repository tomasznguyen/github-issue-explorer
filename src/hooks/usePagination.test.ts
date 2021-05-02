import { act, renderHook } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

describe("usePagination", () => {
  const render = <T>(items: T[], items_per_page: number) => {
    return renderHook(() => usePagination(items, items_per_page));
  };

  it("sets currentPage and pageCount to 0 when there are no items", () => {
    const { result } = render([], 25);

    expect(result.current.currentPage).toEqual(0);
    expect(result.current.pageCount).toEqual(0);
    expect(result.current.pageItems).toHaveLength(0);
  });

  it("sets currentPage, pageCount, and pageItems correctly", () => {
    const { result } = render([1, 2, 3, 4, 5, 6, 7], 3);

    expect(result.current.currentPage).toEqual(0);
    expect(result.current.pageCount).toEqual(3);
    expect(result.current.pageItems).toHaveLength(3);
    expect(result.current.pageItems).toEqual([1, 2, 3]);
  });

  it("updates currentPage, pageCount, and pageItems correctly on page change", () => {
    const { result } = render([1, 2, 3, 4, 5, 6, 7], 3);

    act(() => {
      result.current.setCurrentPage(1);
    });

    expect(result.current.currentPage).toEqual(1);
    expect(result.current.pageCount).toEqual(3);
    expect(result.current.pageItems).toHaveLength(3);
    expect(result.current.pageItems).toEqual([4, 5, 6]);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toEqual(2);
    expect(result.current.pageCount).toEqual(3);
    expect(result.current.pageItems).toHaveLength(1);
    expect(result.current.pageItems).toEqual([7]);
  });

  it("updates currentPage, pageCount, and pageItems correctly on rerender", () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, 3),
      {
        initialProps: { items: [1, 2, 3, 4, 5, 6, 7] },
      }
    );

    expect(result.current.currentPage).toEqual(0);
    expect(result.current.pageCount).toEqual(3);
    expect(result.current.pageItems).toHaveLength(3);
    expect(result.current.pageItems).toEqual([1, 2, 3]);

    rerender({ items: [8, 9, 10, 11, 12, 13] });

    expect(result.current.currentPage).toEqual(0);
    expect(result.current.pageCount).toEqual(2);
    expect(result.current.pageItems).toHaveLength(3);
    expect(result.current.pageItems).toEqual([8, 9, 10]);
  });
});
