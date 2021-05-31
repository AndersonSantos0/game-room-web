import styled from "styled-components";


export const GameScreenContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0,.75);
  backdrop-filter: blur(96px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    transition: .4s;
  }
`
export const GameBackCover = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 400px;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #333;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  > div{
    width: 100%;
  }

  :after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,.8), transparent 60%);
    backdrop-filter: blur(4px);
  }
`

export const GameScreenContent = styled.div`
  position: relative;
  
  > header{
    max-width: 1400px;
    margin: auto;
    display: flex;
    padding: 0 2rem;
    position: relative;
    height: 60vh;
    min-height: 400px;
  }

  > section{
    max-width: 1400px;
    padding: 0 2rem;
    padding-top: 2rem;
    margin: auto;
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;

    > div{
      width: 16rem;
      margin-top: 3.5rem;
    }

    > div:first-child{
      display: flex;
      flex-direction: column;
      gap: 1rem; 

      > button{
        width: 100%;
        height: 2.5rem;
        border-radius: 0.25rem;
        background-color: var(--primary);
        border: none;
        color: #fff;
        cursor: pointer;
        transition: transform .2s, background-color .2s;
        outline: none;

        &:active{
          background-color: var(--secondary);
          transform: scale(.95);
        }
      }

      > p{
        color: var(--primary);

        span{
          color: #fff;
          font-family: KoHo semibold;
        }

        a{
          color: var(--primary);
          text-decoration: none;

          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      h1 {
        color: #fff;
        font-family: KoHo semibold;
        font-weight: 100;
        margin: 1.5rem 0 1rem 0;
        font-size: 2rem;
      }

      p{
        color: #fff;
        text-align: justify;
      }
    }
  }
`

export const ScreenshotsContainer = styled.div`
  padding: 1rem 0;
  padding-bottom: 1rem;
  position: relative;

  .container {
    ul{
      //height: 360px;
    }
  }

  .screenshot {
    padding: 0 .25rem;
    aspect-ratio: 16/9;

    > div{
      border-radius: 0.25rem;
      overflow: hidden;
      display: flex;
      height: 100%;
      background-color: #333;
      cursor: pointer;

      > .video{
        width: 100%;
        height: 100%;
      }
    }
  }

  .dots{
    width: 100%;
    max-width: 1400px;
    height: fit-content;
    justify-content: flex-end;
    margin: 0 auto;
    top: 2.5rem;
  }

  h1 {
    max-width: 1400px;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0 2rem;
    color: #fff;
    font-family: KoHo semibold;
    font-weight: 100;
  }
`

export const ScreenshotsContainerArrowsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: .5rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  button{
    width: 4rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: transform .2s;

    &:active{
      transform: scale(.95);
    }

    &:first-child{
      background: rgba(0,0,0,.8);//linear-gradient(90deg, #000, transparent 100%);
      border: none;
      backdrop-filter: blur(8px);
      outline: none;
    }

    &:last-child{
      background: rgba(0,0,0,.8);//linear-gradient(270deg, #000, transparent 100%);
      border: none;
      backdrop-filter: blur(8px);
      outline: none;
    }
  }
`

export const GameCover = styled.div`
  width: 16rem;
  min-width: 16rem;
  height: 22rem;
  display: flex;
  border-radius: .25rem;
  overflow: hidden;
  background-color: #333;
  align-self: flex-end;
  position: relative;
  bottom: -4rem;

  > div{
    width: 100%;
  }
`

export const GameInfo = styled.div`
  padding: 0 2rem;
  align-self: flex-end;
  padding-bottom: 2rem;

  h1{
    font-size: 3rem;
    font-weight: 100;
    font-family: Hammersmith;
    color: #fff;
    overflow-y: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  h2{
    font-size: 1.2rem;
    font-weight: 100;
    font-family: Hammersmith;
    color: #aaa;
    margin-left: .15rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h3{
    font-size: 1.2rem;
    font-weight: 100;
    font-family: Hammersmith;
    color: var(--primary);
    margin-left: .15rem;
    line-height: 2rem;
    text-decoration: underline;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p{
    color: orange;
    font-family: KoHo semibold;
    margin-left: .15rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const TotalRating = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #222;
  padding: 1rem;
  border-radius: 4rem;
  position: absolute;
  right: 10rem;
  bottom: -2rem;

  h1{
    font-size: 2rem;
    color: var(--primary);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h2{
    font-size: 1rem;
    width: 6rem;
    text-align: center;
    position: absolute;
    top: 9rem;
    color: #fff;
    font-weight: 400;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const CriticRating = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  background-color: #222;
  padding: 1rem;
  border-radius: 3.25rem;
  position: absolute;
  right: 2rem;
  bottom: -2rem;

  h1{
    font-size: 1.25rem;
    font-weight: 400;
    color: orange;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h2{
    font-size: 1rem;
    width: 6rem;
    text-align: center;
    position: absolute;
    top: 7.5rem;
    color: #fff;
    font-weight: 400;
    left: 50%;
    transform: translateX(-50%);
  }
`