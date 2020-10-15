import styled from "styled-components";

export const Container = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  top: 70px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 20%;
  padding-right: 20%;
  z-index: 2;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.text};
  }

  .theme-provider {
    color: ${({ theme }) => theme.text};
  }

  .tabs {
    color: ${({ theme }) => theme.text};
    overflow: scroll;
  ]}
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  z-index: 1;
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 auto;
`;

export const Li = styled.li`
  margin-left: 5px;
`;

export const H1 = styled.h1`
  font-size: 3em;
  font-weight: bold;
`;

export const P = styled.p`
  font-size: 1.2em;
`;

export const Div = styled.div`
  margin: 0 auto;
  width: ${(props) => props.width};
`;

export const Span = styled.span`
  display: flex;
`;
