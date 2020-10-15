import styled from "styled-components";

export const LeftSideContainer = styled.section`
  position: absolute;
  top: 100px;
  left: 15px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: fit-content;
  min-height: 60%;
  max-height: 80%;
  padding: 15px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PlaceCard = styled.div`
  margin-bottom: 5px;
`;
