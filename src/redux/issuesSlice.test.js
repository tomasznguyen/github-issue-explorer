import reducer, {
  FetchingStatus,
  fetchIssues,
  initialState,
} from "./issuesSlice";

const issues = [
  {
    id: 805579798,
    number: 24855,
    title: "[Autocomplete] Rename getOptionSelected to optionEqualValue",
    user: {
      login: "oliviertassinari",
    },
    state: "open",
    // "created_at": "2021-02-10T14:47:40Z",
    body:
      "<!-- Provide a general summary of the feature in the Title above -->\r\n\r\n<!--\r\n  Thank you very much for contributing to Material-UI by creating an issue! ❤️\r\n  To avoid duplicate issues we ask you to check off the following list.\r\n-->\r\n\r\n<!-- Checked checkbox should look like this: [x] -->\r\n\r\n- [x] I have searched the [issues](https://github.com/mui-org/material-ui/issues) of this repository and believe that this is not a duplicate.\r\n\r\n## Summary 💡\r\n\r\nIn the [v5 RFC](https://github.com/mui-org/material-ui/issues/20012) issue, we have a mention of doing this change but no dedicated issue. Developers can get a better idea of the motivation for the change by searching for `getOptionSelected` in the closed issues. Or https://github.com/mui-org/material-ui/issues/19595#issuecomment-620221948\r\n\r\n## Motivation\r\n\r\nMake the API more intuitive, the mental model can be improved. \r\n\r\nOn a related note, a few developers have been asking for the same feature with the Select: #24201",
  },
  {
    id: 803082838,
    number: 24829,
    title:
      "RangeError: Format string contains an unescaped latin alphabet character `n`",
    user: {
      login: "dborstelmann",
    },
    state: "open",
    // created_at: "2021-02-07T22:59:34Z",
    body:
      "- [x] The issue is present in the latest release.\r\n- [x] I have searched the [issues](https://github.com/mui-org/material-ui/issues) of this repository and believe that this is not a duplicate.\r\n\r\nI am trying to override AdapterDateFns so that the picker always renders without timezone adjustment.  I want the picker to show the same date/time as the database, ignoring all timezone.\r\n\r\nI am following this example: https://github.com/dmtrKovalenko/date-io/issues/55\r\nRelated to: https://github.com/mui-org/material-ui-pickers/issues/1440\r\n\r\n## Current Behavior 😯\r\n\r\nRange error\r\n\r\n## Expected Behavior 🤔\r\n\r\nNo range error\r\n\r\n## Steps to Reproduce 🕹\r\n\r\nhttps://codesandbox.io/s/sparkling-browser-y3g47?file=/src/index.tsx\r\n\r\nSteps:\r\n\r\n1. Load the page, you will see datepicker doesn't load due to RangeError.\r\n\r\n## Context 🔦\r\n\r\nI am trying to override AdapterDateFns so that the picker always renders without timezone adjustment.  I want the picker to show the same date/time as the database, ignoring all timezone.\r\n\r\nI am following this example: https://github.com/dmtrKovalenko/date-io/issues/55\r\nRelated to: https://github.com/mui-org/material-ui-pickers/issues/1440\r\n\r\n## Your Environment 🌎\r\n\r\n<details>\r\n  <summary>`npx @material-ui/envinfo`</summary>\r\n  \r\n```\r\n  System:\r\n    OS: macOS 10.15.7\r\n  Binaries:\r\n    Node: 12.13.1 - /usr/local/bin/node\r\n    Yarn: 1.22.4 - /usr/local/bin/yarn\r\n    npm: 6.14.8 - /usr/local/bin/npm\r\n  Browsers:\r\n    Chrome: 88.0.4324.146\r\n  npmPackages:\r\n    @emotion/react: 11.1.4 => 11.1.4 \r\n    @emotion/styled: 11.0.0 => 11.0.0 \r\n    @material-ui/core: 5.0.0-alpha.24 => 5.0.0-alpha.24 \r\n    @material-ui/icons: 5.0.0-alpha.24 => 5.0.0-alpha.24 \r\n    @material-ui/lab: 5.0.0-alpha.24 => 5.0.0-alpha.24 \r\n    @material-ui/styled-engine:  5.0.0-alpha.24 \r\n    @material-ui/styles:  5.0.0-alpha.24 \r\n    @material-ui/system:  5.0.0-alpha.24 \r\n    @material-ui/types:  5.1.6 \r\n    @material-ui/unstyled:  5.0.0-alpha.24 \r\n    @material-ui/utils:  5.0.0-alpha.24 \r\n    @types/react: 16.9.25 => 16.9.25 \r\n    react: 16.13.0 => 16.13.0 \r\n    react-dom: 16.13.0 => 16.13.0 \r\n    styled-components: 5.0.1 => 5.0.1 \r\n    typescript: 3.8.2 => 3.8.2 \r\n    date-fns: 2.17.0\r\n    date-fns-tz: 1.1.1\r\n```\r\n</details>\r\n",
  },
];

describe("issuesSlice", () => {
  describe("reducers", () => {
    it("sets status to fetching when fetchIssues is pending", () => {
      const action = { type: fetchIssues.pending.type };
      const state = reducer(initialState, action);

      expect(state.status).toEqual(FetchingStatus.Fetching);
    });

    it("sets items and sets status to succeeded when fetchIssues is fulfilled", () => {
      const action = { type: fetchIssues.fulfilled.type, payload: issues };
      const state = reducer(initialState, action);

      expect(state.status).toEqual(FetchingStatus.Succeeded);
      expect(state.items).toHaveLength(2);
    });

    it("sets error and sets status to failed when fetchIssues is rejected", () => {
      const action = { type: fetchIssues.rejected.type, payload: "Not Found" };
      const state = reducer(initialState, action);

      expect(state.status).toEqual(FetchingStatus.Failed);
      expect(state.error).toEqual("Not Found");
    });
  });
});
