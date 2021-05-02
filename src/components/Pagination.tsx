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
  const paginationItems = React.useMemo(
    () => Array.from({ length: pages }, (_, i) => i),
    [pages]
  );

  return (
    <Navigation>
      <ListBox>
        <ListItem
          className={page === 0 ? "disabled" : ""}
          onClick={page === 0 ? undefined : () => onPageChange(page - 1)}
        >
          &lt;
        </ListItem>
        {paginationItems.map((item) => (
          <ListItem
            className={item === page ? "active" : ""}
            key={item}
            onClick={() => onPageChange(item)}
          >
            {item + 1}
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
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  margin: 0 3px;
  min-width: 32px;
  text-align: center;

  &.active {
    background-color: lightgrey;
    cursor: default;
  }

  &.disabled {
    color: lightgrey;
    cursor: default;
  }

  &:not(.active):not(.disabled):hover {
    background-color: #eee;
  }
`;

export default Pagination;
