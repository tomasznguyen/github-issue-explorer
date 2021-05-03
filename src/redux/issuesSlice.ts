import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  items: Issue[];
  status: FetchingStatus;
}

export const initialState: IssueState = {
  error: null,
  items: [],
  status: FetchingStatus.Idle,
};

/**
 * Fetches issues for a given organization's repository
 */
export const fetchIssues = createAsyncThunk<
  Issue[],
  { organization: string; repository: string },
  {
    dispatch: AppDispatch;
    rejectValue: string;
    state: RootState;
  }
>("issues/fetchIssues", async (data, { rejectWithValue }) => {
  try {
    const { organization, repository } = data;

    let issues: Issue[] = [];

    for (let page = 1; ; page++) {
      const issuesAndPullRequests = await api.fetchIssues(
        organization,
        repository,
        page
      );

      // If no issues were fetched, all issues have been fetched.
      if (issuesAndPullRequests.length === 0) {
        break;
      }

      const newIssues = issuesAndPullRequests.filter(
        (issue) => issue.pull_request === undefined
      );

      issues = [...issues, ...newIssues];
    }

    return issues;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.status = FetchingStatus.Fetching;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.status = FetchingStatus.Succeeded;
      state.items = action.payload;
    });

    builder.addCase(fetchIssues.rejected, (state, action) => {
      state.status = FetchingStatus.Failed;
      state.error = action.payload as string;
    });
  },
});

export const selectIssues = (state: RootState) => state.issues.items;

export default issuesSlice.reducer;
