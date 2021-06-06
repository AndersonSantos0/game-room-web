import styled from 'styled-components'

export const AuthScreenContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
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
    display: flex;
    flex: 1;
    overflow-y: auto;
    height: 100%;
    align-items: center;

    h2 {
      position: relative;
      font-family: KoHo, sans-serif;
      font-weight: 100;
      display: flex;
      font-size: 1rem;
      text-align: center;
      padding: 0.5rem 0;
      margin-top: -0.5rem;
      align-self: center;
      align-items: center;

      &::after {
        content: '';
        position: absolute;
        width: 4rem;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.2);
        left: 2rem;
      }

      &::before {
        content: '';
        position: absolute;
        width: 4rem;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.2);
        right: 2rem;
      }
    }

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      position: relative;
      height: fit-content;
      padding: 2rem 0;

      form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        justify-content: center;
        margin: 0 auto;
        min-width: 350px;

        h1 {
          font-family: KoHo semibold, sans-serif;
          font-weight: 100;
          font-size: 1.5rem;
          margin-bottom: -0.5rem;
        }

        p {
          color: var(--secondary);
          font-size: 0.9rem;
          text-decoration: underline;
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 780px) {
    section {
      flex-direction: column;
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
      height: 100%;

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

      > div {
        min-height: 100%;
        scroll-snap-align: start;
      }
    }
  }
`

export const AuthSeparator = styled.div`
  max-width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 1rem 0;
  min-height: 300px;

  @media (max-width: 780px) {
    display: none !important;
  }
`

export const AuthIcons = styled.div`
  display: flex;
  align-self: center;
  gap: 1rem;

  > .icon {
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    padding: 0.25rem;
    transition: transform 0.2s;

    :active {
      transform: scale(0.9);
    }
  }

  @media (max-width: 780px) {
    position: relative;
    bottom: unset;
  }
`

export const GoToSignUp = styled.a`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  color: var(--primary);
  padding-bottom: 1.5rem;
  text-decoration: none;

  p {
    font-size: 1rem;
  }

  > svg {
    animation: downArrow 1s infinite;
  }

  @keyframes downArrow {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(10px);
      opacity: 1;
    }
  }

  @media (max-width: 780px) {
    display: flex;
  }
`

export const GoToSignIn = styled.a`
  position: absolute;
  top: 0;
  width: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  color: var(--primary);
  padding-top: 1.5rem;
  text-decoration: none;

  p {
    font-size: 1rem;
  }

  > svg {
    animation: upArrow 1s infinite;
  }

  @keyframes upArrow {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  @media (max-width: 780px) {
    display: flex;
  }
`
