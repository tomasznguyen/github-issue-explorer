import React from "react";

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
