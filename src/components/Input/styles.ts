import styled, { css } from 'styled-components'

interface InputContainerProps {
  hasIcon?: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    border-radius: 4px;
    font-size: 1rem;
    color: #fff;
    border: none;
    padding: 0.5rem 0.75rem;
    background-color: rgba(255, 255, 255, 0.15);
    font-family: KoHo, sans-serif;
    outline: none;

    ${props =>
      props.hasIcon &&
      css`
        padding-right: 2.25rem;
      `}
  }

  input[type='button'] {
    background-color: var(--primary);
    transition: transform 0.2s;
    cursor: pointer;

    &:active {
      background-color: var(--secondary);
      transform: scale(0.95);
    }
  }

  input[type='date'] {
    width: 100%;
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export const InputLabel = styled.label`
  font-size: 1rem;
  font-family: KoHo, sans-serif;
`

export const InputIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  cursor: pointer;
  height: 100%;
  aspect-ratio: 1/1;
`
