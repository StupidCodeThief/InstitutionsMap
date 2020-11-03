import styled from "styled-components";

const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
  navigator.userAgent
);

export const Container = styled.section`
@media screen and (max-width: 768px) {
  padding-left: 5px;
  padding-right: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
}

@media screen and (min-width: 768px) {
  padding-left: 20%;
  padding-right: 20%;
  left: 15px;
  right: 15px;
  bottom: 15px;
}


  position: absolute;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  top: ${() => (isMobile ? "50px" : "70px")}};
  padding-top: 5%;
  padding-bottom: 5%;
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

  .ant-input-affix-wrapper, input {
    background: ${({ theme }) => theme.input};
    color: ${({ theme }) => theme.text};
  }

`;

