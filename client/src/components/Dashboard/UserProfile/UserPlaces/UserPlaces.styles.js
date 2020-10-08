import styled from "styled-components";

export const DivWithScroll = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
