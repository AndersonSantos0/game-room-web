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

export const BlankBackCoverSpace = styled.div`
  height: 60vh;
  min-height: 400px;
`

export const GameScreenContent = styled.div`
  position: relative;
  top: -18rem;
  
  > header{
    max-width: 1200px;
    margin: auto;
    display: flex;
    padding: 0 2rem;
    position: relative;
  }

  > section{
    max-width: 1200px;
    padding: 0 2rem;
    padding-top: 1rem;
    margin: auto;
    display: flex;

    > div{
      width: 18rem;
    }
    
    main {
      flex: 1;
      margin-top: -3rem;

      p{
        color: #fff;
        text-align: justify;
      }
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

  > div{
    width: 100%;
  }
`

export const GameInfo = styled.div`
  padding: 0 2rem;
  align-self: flex-end;
  padding-bottom: 6rem;

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
  bottom: 0;

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
  bottom: 0;

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