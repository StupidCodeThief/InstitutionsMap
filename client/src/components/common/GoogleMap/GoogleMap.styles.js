import styled from "styled-components";

export const Input = styled.input`
  ::placeholder {
    color: ${({ theme }) => theme.text};
  }

  background: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.text};
`;
