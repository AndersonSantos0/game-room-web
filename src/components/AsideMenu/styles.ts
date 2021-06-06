import styled from 'styled-components'

export const MenuContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(64px);
  flex: 0 1;
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 780px) {
    flex-direction: row;
    width: 100%;
    height: 4rem;
  }
`

export const LogoContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  @media (max-width: 780px) {
    display: none;
  }
`

export const MenuDivisor = styled.div`
  width: 2rem;
  height: 1px;
  background-color: #444;

  @media (max-width: 780px) {
    display: none;
  }
`

export const MenuNav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  overflow-y: hidden;

  ul {
    list-style: none;

    li {
      cursor: pointer;
      height: 4rem;
      width: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        filter: brightness(0.6);
        transition: filter 0.4s, transform 0.4s, color 0.2s;
        color: #fff;
      }
    }

    li:hover {
      > svg {
        filter: brightness(1);
        transform: scale(1.1);

        @media (max-width: 780px) {
          filter: brightness(0.6);
          transform: scale(1);
        }
      }
    }

    li:active,
    li.active {
      > svg {
        color: var(--primary);
        transform: scale(0.9);
      }
    }

    li.active {
      > svg {
        filter: brightness(1) drop-shadow(0 0 8px var(--primary));
      }
    }

    @media (max-width: 780px) {
      display: flex;
      margin: 0 auto;

      li.hidden {
        display: none;
      }
    }
  }
`

export const ConfigContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 780px) {
    display: none;
  }
`
