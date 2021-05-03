import React from "react";

/**
 * Computes the necessary information for a pagination component based on
 * a list of items and the current page.
 * @param {Array} items - The items to be paginated
 * @param {number} itemsPerPage - The max number of items per page
 * @returns {Object} - An object containing the current, the items of the
 *                     current page, the total number of pages and a function
 *                     to change the current page
 */
function usePagination<T>(items: T[], itemsPerPage: number = 25) {
  const [currentPage, setCurrentPage] = React.useState(0);

  const pageCount = React.useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  const pageItems = React.useMemo(() => {
    const startIndex = itemsPerPage * currentPage;

    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, items, itemsPerPage]);

  return { currentPage, pageItems, pageCount, setCurrentPage };
}

export default usePagination;
