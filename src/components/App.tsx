import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import usePagination from "../hooks/usePagination";
import {
  fetchIssues,
  selectError,
  selectIsIdle,
  selectIsLoading,
  selectIssues,
} from "../redux/issuesSlice";
import { useAppDispatch } from "../redux/store";
import GlobalStyle from "../theme/GlobalStyle";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";
import Pagination from "./Pagination";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);
  const isIdle = useSelector(selectIsIdle);
  const isLoading = useSelector(selectIsLoading);
  const issues = useSelector(selectIssues);
  const { currentPage, pageItems, pageCount, setCurrentPage } = usePagination(
    issues,
    10
  );

  const handleSubmit = async (organization: string, repository: string) => {
    dispatch(fetchIssues({ organization, repository }));
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
          <IssueList issues={pageItems} />
          <Pagination
            page={currentPage}
            pages={pageCount}
            onPageChange={setCurrentPage}
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
