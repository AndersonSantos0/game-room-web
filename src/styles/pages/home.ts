import styled from "styled-components";

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: rgba(0,0,0,.75);
  backdrop-filter: blur(96px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 6px solid #111;
    transition: .4s;

    :hover{
      border-left-width: 2px;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`

export const HomeContentContainer = styled.div`
  padding: 24px;
  padding-right: 14px;
  width: 100%;
  height: fit-content;

  > h1{
    color: #fff;
    font-family: KoHo semibold;
    font-weight: 100;
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }
`