import React from "react";
import styled from "styled-components";

interface InputFieldProps {
  errorMessage?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}

const InputField: React.FC<InputFieldProps> = ({
  errorMessage,
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        onChange={(e) => onChange(e.currentTarget.value)}
        type="text"
        value={value}
      />
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 4px;
  max-width: 400px;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: red;
  margin-bottom: 8px;
`;

const Input = styled.input`
  border: none;
  border-bottom-color: #cfcfcf;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  color: #495057;
  font-size: 16px;
  height: 28px;
  margin: 6px 0;
  outline: none;
  padding: 0;
  transition: border-bottom-color 300ms ease;

  &:focus {
    border-bottom-color: #ef4339;
  }
`;

const Label = styled.label`
  color: #444;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
  flex-basis: 110px;
`;

export default InputField;
