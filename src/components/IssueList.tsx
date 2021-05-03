import styled from "styled-components";
import { ReactComponent as OpenIssueIcon } from "../assets/open.svg";
import { ReactComponent as ClosedIssueIcon } from "../assets/closed.svg";
import { Issue } from "../types";

interface IssueListProps {
  issues: Issue[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <ListBox>
      {issues.map((issue) => (
        <ListItem key={issue.id}>
          <Icon>
            {issue.state === "open" && <OpenIssueIcon />}
            {issue.state === "closed" && <ClosedIssueIcon />}
          </Icon>
          <Content>
            <Title href={issue.html_url} target="_blank">
              {issue.title}
            </Title>
            <Subtitle>
              #{issue.number} by {issue.user.login}
            </Subtitle>
          </Content>
        </ListItem>
      ))}
    </ListBox>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    margin-right: 8px;

    &.closed {
      fill: #cb2431;
    }

    &.open {
      fill: #22863a;
    }
  }
`;

const ListBox = styled.ul`
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  list-style-type: none;
  margin: 0 16px;
  padding-left: 0;
`;

const ListItem = styled.li`
  display: flex;
  padding: 12px;

  &:hover {
    background-color: #fafafa;
  }

  &:not(:first-child) {
    border-top: 1px solid #cfcfcf;
  }
`;

const Title = styled.a`
  color: #444;
  font-weight: bold;
  margin-bottom: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Subtitle = styled.span`
  color: darkgrey;
  font-size: smaller;
`;

export default IssueList;
