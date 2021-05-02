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
  page: number = 1
): Promise<Issue[]> => {
  return fetch(
    `https://api.github.com/repos/${organization}/${repository}/issues?per_page=100&page=${page}&state=all`
  )
    .then((res) => res.json())
    .catch((err) => Promise.reject<string>(err.message));
};
