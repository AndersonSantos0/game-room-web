import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(96px);
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  pointer-events: visible;

  section {
    padding: 0 4rem;
    font-family: KoHo semibold, sans-serif;
    position: relative;
    z-index: 1;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`

export const NotFoundCodeContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  border-right: solid 1px #666;
  padding: 0 4rem;
  font-family: KoHo semibold, sans-serif;
  position: relative;
  z-index: 1;

  > svg {
    filter: grayscale(0.8);
    animation: FailLogo 2s ease-in-out infinite;
    opacity: 0.8;
  }

  @keyframes FailLogo {
    0% {
      filter: grayscale(0.6);
    }
    50% {
      filter: grayscale(1);
    }
    100% {
      filter: grayscale(0.6);
    }
  }
`

export const ComingContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(96px);
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  pointer-events: visible;

  section {
    padding: 0 4rem;
    font-family: KoHo semibold, sans-serif;
    position: relative;
    z-index: 1;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.5rem;
      max-width: 600px;
    }
  }
`

export const ComingCodeContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  border-right: solid 1px #666;
  padding: 0 4rem;
  font-family: KoHo semibold, sans-serif;
  position: relative;
  z-index: 1;

  > svg {
    filter: hue-rotate(180deg);
    animation: ComingLogo 2s ease-in-out infinite;
    opacity: 0.8;
  }

  @keyframes ComingLogo {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`
