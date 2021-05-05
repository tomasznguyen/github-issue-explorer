import React from "react";
import styled from "styled-components";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  onPageChange,
}) => {
  const paginationItems = React.useMemo(() => {
    if (pages <= 9) {
      return Array.from({ length: pages }, (_, i) => i);
    }

    let result: (string | number)[] = [0, 1, 2];

    if (page > 3) {
      result.push("…");
    }

    if (page > 2 && page < pages - 3) {
      result.push(page);
    }

    if (page < pages - 4) {
      result.push("…");
    }

    result = [...result, pages - 3, pages - 2, pages - 1];

    return result;
  }, [page, pages]);

  return (
    <Navigation>
      <ListBox>
        <ListItem
          className={page === 0 ? "disabled" : ""}
          onClick={page === 0 ? undefined : () => onPageChange(page - 1)}
        >
          &lt;
        </ListItem>
        {paginationItems.map((item, index) => (
          <ListItem
            className={
              item === page ? "active" : item === "…" ? "ellipsis" : ""
            }
            key={index}
            onClick={
              item !== "…" ? () => onPageChange(item as number) : undefined
            }
          >
            {item !== "…" ? +item + 1 : item}
          </ListItem>
        ))}
        <ListItem
          className={page === pages - 1 ? "disabled" : ""}
          onClick={
            page === pages - 1 ? undefined : () => onPageChange(page + 1)
          }
        >
          &gt;
        </ListItem>
      </ListBox>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
`;

const ListBox = styled.ul`
  display: inline-flex;
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  align-items: center;
  border-radius: 16px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  margin: 0 3px;
  min-width: 32px;
  padding: 0 8px;
  text-align: center;

  &.active {
    background-color: lightgrey;
    cursor: default;
  }

  &.disabled {
    color: lightgrey;
    cursor: default;
  }

  &.ellipsis {
    cursor: default;
  }

  &:not(.active):not(.disabled):not(.ellipsis):hover {
    background-color: #eee;
  }
`;

export default Pagination;
