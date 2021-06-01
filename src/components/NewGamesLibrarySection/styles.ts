import styled from "styled-components"
const isProd = process.env.NODE_ENV === "production"

export const GamesLibraryContainerGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 1.5rem 1rem;
  width: 100%;
  padding: 0 1rem;
`

export const GamesLibrarySlideContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  .dots{
      justify-content: flex-end;
      padding-right: 8rem;
      top: 1.4rem;
      bottom: unset !important;
      opacity: 0;
      transition: opacity 0.2s;
  }

  .container{
    padding: 2rem .5rem;

    .game{
      padding: 0 .5rem;

      &:hover{
        z-index: 2;
      }
    }
  }

  &:hover{
    .dots{
      opacity: 1;
    }
  }

`

export const GamesLibrarySlideArrows = styled.div`
  display: flex;
  align-self: flex-end;
  border-radius: 0.5rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  
  > button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2.5rem;
    background-color: rgba(51, 154, 255, .1);
    transition: opacity 0.4s;
    cursor: pointer;
    border: none;
    outline: none;
    
    &:active{
      background-color: rgba(51, 154, 255, .15);
    }

    > svg{
      color: #fff;
    }

    &:disabled{
      opacity: .4;
      cursor: default;

      &:active{
        background-color: rgba(51, 154, 255, .1);
      }
    }
  }
`

export const GamesLibraryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1{
    color: #fff;
    font-family: KoHo semibold;
    font-weight: 100;
  }
`

export const GamesLibraryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${isProd ? '11rem' : '12rem'}, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 1.5rem 1rem;
  width: 100%;
  padding: 0 1rem;
`

