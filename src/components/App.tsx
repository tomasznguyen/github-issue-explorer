import React from "react";
import { useSelector } from "react-redux";
import usePagination from "../hooks/usePagination";
import { fetchIssues, selectIssues } from "../redux/issuesSlice";
import { useAppDispatch } from "../redux/store";
import GlobalStyle from "../theme/GlobalStyle";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";
import Pagination from "./Pagination";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
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
      <IssueForm onSubmit={handleSubmit} />
      <IssueList issues={pageItems} />
      <Pagination
        page={currentPage}
        pages={pageCount}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default App;
