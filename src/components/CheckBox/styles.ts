import styled from 'styled-components'

export const CheckBoxContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;

  input {
    border-radius: 4px;
    appearance: none;
    background-color: rgba(255, 255, 255, 0.2);
    width: 1.25rem;
    height: 1.25rem;
    outline: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input:checked::after {
    content: '';
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background-color: var(--primary);
    border-radius: 4px;
    transform-origin: center;
    animation: checked 0.3s ease-out;

    @keyframes checked {
      0% {
        transform: scale(0.5);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`

export const CheckBoxLabel = styled.label`
  font-family: KoHo, sans-serif;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
`
