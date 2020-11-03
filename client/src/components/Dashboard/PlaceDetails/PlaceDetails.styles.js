import styled from "styled-components";

const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
  navigator.userAgent
);

export const PlaceInfo = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: ${isMobile ? "wrap-reverse" : "wrap"};
  background: transparent;
  justify-content: space-between;
`;

export const PlacePhoto = styled.div`
  width: ${isMobile ? "100%" : "50%"};
  max-height: ${isMobile ? "50vh" : "50%"};

  img {
    width: 100%;
    height: 100%;
  }
`;

export const PlaceText = styled.div`
  width: ${isMobile ? "100%" : "50%"};
`;
