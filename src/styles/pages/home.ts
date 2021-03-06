import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(96px);
  flex-direction: column;
`

export const HomeContentContainer = styled.div`
  flex: 1;
  padding: 24px;
  padding-right: 14px;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 4rem);

  > h1 {
    color: #fff;
    font-family: KoHo semibold, sans-serif;
    font-weight: 100;
    font-size: 1.5rem;
    padding-bottom: 2rem;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    transition: 0.4s;
  }

  @media (max-width: 780px) {
    max-width: 100%;
    max-height: calc(100vh - 8rem);
  }
`
