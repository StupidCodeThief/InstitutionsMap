import styled from "styled-components";

const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
  navigator.userAgent
);

export const LeftSideContainer = styled.section`
  position: absolute;
  top: ${isMobile ? "87px" : "100px"};
  left: ${isMobile ? "10px" : "15px"};
  right: ${isMobile ? "10px" : ""};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: ${isMobile ? "95vw" : "fit-content"};
  min-height: ${isMobile ? "85%" : "50%"};
  max-height: 85%;
  padding: ${isMobile ? "2px" : "15px"};
  padding-top: ${isMobile ? "5px" : ""};
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PlaceCard = styled.div`
  margin-bottom: 5px;
`;
