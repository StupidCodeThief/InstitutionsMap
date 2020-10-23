import styled from "styled-components";

export const DivWithTheme = styled.div`
  .am-list-body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  .am-list-item {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  h3 {
    color: ${({ theme }) => theme.text};
  }
`;

export const Header = styled.header`
  @media screen and (max-width: 768px) {
    top: 5px;
    left: 5px;
    right: 5px;
  }

  @media screen and (min-width: 768px) {
    top: 15px;
    left: 15px;
    right: 15px;
  }

  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  z-index: 1;
`;
