import styled from 'styled-components'

export const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(96px);
  flex-direction: column;
`

export const SearchContentContainer = styled.div`
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
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 6px solid #111;
    transition: 0.4s;

    :hover {
      border-left-width: 2px;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`

export const BlankGamesSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  padding: 0 4rem;

  svg {
    filter: grayscale(0.5);
    animation: FailLogo 2s ease-in-out infinite;
  }

  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    h1 {
      color: #fff;
      font-family: KoHo semibold, sans-serif;
      font-weight: 100;
      max-width: 60%;
    }

    h2 {
      color: #aaa;
      font-family: KoHo semibold, sans-serif;
      font-weight: 100;
    }
  }
`
