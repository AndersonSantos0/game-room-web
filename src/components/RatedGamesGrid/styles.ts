import styled from 'styled-components'

export const RatedGamesGridContainer = styled.div`
  display: grid;
  gap: 2rem;
  padding: 0 1rem;
  grid-auto-rows: calc(65vh / 3);
  width: 100%;
  margin-bottom: 2rem;

  > div {
    position: relative;
    cursor: pointer;
  }

  > div.skeleton {
    position: relative;
    z-index: -1;
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.025);
    overflow: hidden;
    animation: skeleton 1s infinite;
  }

  > .primary {
    grid-column: span 3;
    grid-row: 1 / span 2;
  }

  > .secondary {
    grid-row: 1 / span 2;
  }

  > .terciary {
    grid-column: 1 / span 2;
  }

  @media (max-width: 780px) {
    > .primary {
      grid-column: 1 / span 2;
      grid-row: 1;
    }

    > .secondary {
      grid-column: 1 / span 2;
      grid-row: 2;
    }

    > .terciary {
      grid-row: 3;
    }

    > .item {
      grid-column: 1 / span 2;
    }
  }
`

interface CoverProps {
  length?: number
  counter: number
}

export const Cover = styled.div<CoverProps>`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 0.25rem;
  overflow: hidden;
  position: relative;

  .container {
    position: absolute;
    width: calc(100% * ${props => props.length});
    left: calc(100% * -${props => props.counter});
    transition: left 0.4s;
    height: 100%;
    display: flex;
    top: 0;

    > div {
      flex: 1;
      opacity: 1;
    }
  }

  &:hover {
    .container {
    }
  }
`

export const RatedGamesGridContent = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0.8rem 1rem;
  background: linear-gradient(155deg, #000 2%, transparent 98%);
  border-radius: 0.25rem;

  h1 {
    color: #fff;
    font-size: 1.5rem;
    font-family: KoHo semibold, sans-serif;
    font-weight: 100;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }

  h2 {
    color: var(--primary);
    font-size: 1rem;
    font-family: KoHo semibold, sans-serif;
    font-weight: 100;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
`

export const GameRating = styled.div`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  background-color: orange;
  width: 3.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 0.25rem;
  border-top-left-radius: 0.5rem;
  transition: border 0.2s;
  color: #fff;
  font-family: KoHo semibold, sans-serif;
`
