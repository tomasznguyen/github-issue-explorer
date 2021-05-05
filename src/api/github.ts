import { Issue } from "../types";

/**
 * Fetches GitHub issues for a given organization and repository
 * @param {string} organization - An organization on GitHub
 * @param {string} repository - An organization's repository
 * @param {number} page - Page number of the results to fetch
 * @returns {Array} - A list of issues
 */
export const fetchIssues = (
  organization: string,
  repository: string,
  issuesPerPage: number,
  page: number
): Promise<Issue[]> => {
  return fetch(
    `https://api.github.com/repos/${organization}/${repository}/issues?per_page=${issuesPerPage}&page=${page}&state=all`
  )
    .then(async (res) => {
      if (res.status >= 400) {
        return Promise.reject(await res.json());
      }

      return res.json();
    })
    .catch((err) => Promise.reject<string>(err.message));
};

/**
 * Searches GitHub issues for a given organization and repository
 * @param {string} organization - An organization on GitHub
 * @param {string} repository - An organization's repository
 * @param {number} page - Page number of the results to fetch
 * @returns {Object} - A list of issues and the total issue count
 */
export const searchIssues = (
  organization: string,
  repository: string,
  issuesPerPage: number,
  page: number
): Promise<{ total_count: number; items: Issue[] }> => {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${organization}/${repository}+type:issue&page=${page}&per_page=${issuesPerPage}`
  )
    .then(async (res) => {
      if (res.status >= 400) {
        return Promise.reject(await res.json());
      }

      return res.json();
    })
    .catch((err) => Promise.reject<string>(err.message));
};

/**
 * Searches GitHub pull requests for a given organization and repository
 * @param {string} organization - An organization on GitHub
 * @param {string} repository - An organization's repository
 * @param {number} page - Page number of the results to fetch
 * @returns {Object} - A list of pull requests and the total pull request count
 */
export const searchPulls = (
  organization: string,
  repository: string,
  issuesPerPage: number,
  page: number
): Promise<{ total_count: number; items: Issue[] }> => {
  return fetch(
    `https://api.github.com/search/issues?q=repo:${organization}/${repository}+type:pull-request&page=${page}&per_page=${issuesPerPage}`
  )
    .then(async (res) => {
      if (res.status >= 400) {
        return Promise.reject(await res.json());
      }

      return res.json();
    })
    .catch((err) => Promise.reject<string>(err.message));
};
