import React from "react";
import styled from "styled-components";
import InputField from "./InputField";

interface IssueFormProps {
  onSubmit: (organizaiton: string, repository: string) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [organization, setOrganization] = React.useState("");
  const [repository, setRepository] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    if (organization && repository) {
      onSubmit(organization, repository);
    }
  };

  return (
    <Container>
      <div>
        <InputField
          errorMessage={
            submitted && !organization ? "This field is required" : undefined
          }
          id="organization"
          label="Organization"
          value={organization}
          onChange={setOrganization}
        />
        <InputField
          errorMessage={
            submitted && !repository ? "This field is required" : undefined
          }
          id="repository"
          label="Repository"
          value={repository}
          onChange={setRepository}
        />
      </div>
      <div>
        <Button onClick={handleSubmit}>Load</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px;
`;

const Button = styled.button`
  background-color: #ef4339;
  border: none;
  border-radius: 16px;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
  color: #fafafa;
  height: 32px;
  margin: 16px 0;
  padding: 8px 24px;
  text-transform: uppercase;
  transition: box-shadow 300ms ease;

  &:focus {
    box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.3);
  }
`;

export default IssueForm;
