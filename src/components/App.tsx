import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import {
  fetchIssues,
  fetchRepositoryInformation,
  selectError,
  selectIsIdle,
  selectIsLoading,
  selectIssuesForPage,
  selectPageCount,
} from "../redux/issuesSlice";
import { RootState, useAppDispatch } from "../redux/store";
import GlobalStyle from "../theme/GlobalStyle";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";
import Pagination from "./Pagination";

const issuesPerPage = 25;

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState(0);
  const error = useSelector(selectError);
  const isIdle = useSelector(selectIsIdle);
  const isLoading = useSelector(selectIsLoading);
  const issues = useSelector((state: RootState) =>
    selectIssuesForPage(state, currentPage + 1)
  );
  const pageCount = useSelector(selectPageCount);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchIssues({ page: page + 1 }));
  };

  const handleSubmit = async (organization: string, repository: string) => {
    setCurrentPage(0);
    dispatch(
      fetchRepositoryInformation({ organization, repository, issuesPerPage })
    );
  };

  return (
    <>
      <GlobalStyle />

      <Heading>GitHub Issue Overview</Heading>
      <IssueForm onSubmit={handleSubmit} />

      {error !== null && (
        <Container>
          <p>Failed loading issues: {error}</p>
        </Container>
      )}

      {isLoading && (
        <Container>
          <Spinner style={{ transform: "scaleX(-1)" }} />
        </Container>
      )}

      {!isIdle && !isLoading && error === null && (
        <>
          <IssueList issues={issues} />
          <Pagination
            page={currentPage}
            pages={pageCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 200px;
  justify-content: center;
`;

const Heading = styled.h1`
  margin-left: 16px;
  margin-right: 16px;
`;

export default App;
