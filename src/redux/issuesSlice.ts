import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as api from "../api/github";
import { Issue } from "../types";
import { AppDispatch, RootState } from "./store";

export enum FetchingStatus {
  Idle = "idle",
  Fetching = "fetching",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface IssueState {
  error: string | null;
  data: { [key: number]: Issue[] };
  issuesPerPage: number;
  organization: string | null;
  pageCount: number;
  repository: string | null;
  status: FetchingStatus;
}

export const initialState: IssueState = {
  error: null,
  data: {},
  issuesPerPage: 10,
  organization: null,
  pageCount: 0,
  repository: null,
  status: FetchingStatus.Idle,
};

/**
 * Fetches information of a given organization's repository
 */
export const fetchRepositoryInformation = createAsyncThunk<
  {
    issues: Issue[];
    issuesPerPage: number;
    organization: string;
    page: number;
    repository: string;
    totalCount: number;
  },
  {
    organization: string;
    repository: string;
    issuesPerPage: number;
  },
  {
    dispatch: AppDispatch;
    rejectValue: string;
    state: RootState;
  }
>("issues/fetchInformation", async (data, { rejectWithValue }) => {
  try {
    const { organization, repository, issuesPerPage } = data;
    const page = 1;

    if (issuesPerPage <= 0) {
      throw Error("issuesSlice: issuesPerPage should be greater than 0");
    }

    if (issuesPerPage > 100) {
      throw Error(
        "issuesSlice: issuesPerPage should be less than or equal to 100"
      );
    }

    const { total_count: total_count_issues } = await api.searchIssues(
      organization,
      repository,
      issuesPerPage,
      page
    );

    const { total_count: total_count_pulls } = await api.searchPulls(
      organization,
      repository,
      issuesPerPage,
      page
    );

    const issues = await api.fetchIssues(
      organization,
      repository,
      issuesPerPage,
      page
    );

    return {
      issues,
      issuesPerPage,
      organization,
      page,
      repository,
      totalCount: total_count_issues + total_count_pulls,
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});

/**
 * Fetches issues for a given organization's repository
 */
export const fetchIssues = createAsyncThunk<
  { issues: Issue[]; page: number },
  { page: number },
  {
    dispatch: AppDispatch;
    rejectValue: string;
    state: RootState;
  }
>("issues/fetchIssues", async ({ page }, { getState, rejectWithValue }) => {
  try {
    const {
      issues: { organization, repository, data, issuesPerPage },
    } = getState();

    if (data[page] !== undefined) {
      return { issues: data[page], page };
    }

    if (organization === null || repository === null) {
      throw Error(
        "issuesSlice: you should dispatch 'fetchInformation' before dispatching 'fetchIssues'"
      );
    }

    const issues = await api.fetchIssues(
      organization,
      repository,
      issuesPerPage,
      page
    );

    return { issues, page };
  } catch (err) {
    return rejectWithValue(err);
  }
});

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setOrganizationAndRepository: (
      state,
      action: PayloadAction<{ organization: string; repository: string }>
    ) => {
      const { organization, repository } = action.payload;

      state.organization = organization;
      state.repository = repository;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepositoryInformation.pending, (state) => {
      state.status = FetchingStatus.Fetching;
      state.error = null;
    });

    builder.addCase(fetchRepositoryInformation.fulfilled, (state, action) => {
      const {
        issues,
        issuesPerPage,
        organization,
        page,
        repository,
        totalCount,
      } = action.payload;

      state.status = FetchingStatus.Succeeded;
      state.data = { [page]: issues };
      state.issuesPerPage = issuesPerPage;
      state.organization = organization;
      state.pageCount = Math.ceil(totalCount / issuesPerPage);
      state.repository = repository;
      state.error = null;
    });

    builder.addCase(fetchRepositoryInformation.rejected, (state, action) => {
      state.status = FetchingStatus.Failed;
      state.error = action.payload as string;
    });

    builder.addCase(fetchIssues.pending, (state) => {
      state.status = FetchingStatus.Fetching;
      state.error = null;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      const { issues, page } = action.payload;

      state.status = FetchingStatus.Succeeded;
      state.data[page] = issues;
      state.error = null;
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.status = FetchingStatus.Failed;
      state.error = action.payload as string;
    });
  },
});

export const selectError = (state: RootState) => state.issues.error;
export const selectIsIdle = (state: RootState) =>
  state.issues.status === FetchingStatus.Idle;
export const selectIsLoading = (state: RootState) =>
  state.issues.status === FetchingStatus.Fetching;
export const selectIssues = (state: RootState) => state.issues.data;
export const selectIssuesForPage = createSelector(
  [
    (state: RootState) => state.issues.data,
    (state: RootState, page: number) => page,
  ],
  (issues, page) => issues[page] || []
);
export const selectPageCount = (state: RootState) => state.issues.pageCount;

export default issuesSlice.reducer;
