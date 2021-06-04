import styled, { css } from 'styled-components'

interface GameItemContainerProps {
  image?: string
  tooRight?: boolean
}

export const GameItemContainer = styled.div<GameItemContainerProps>`
  position: relative;
  aspect-ratio: 3/4;
  cursor: pointer;
  transition: .2s;
  width: 100%;
  user-select: none;

  &:active{
    transform: scale(1) !important;
  }

  .cover{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
    transition: border-radius .2s;
    overflow: hidden;
    background: #333;
    display: flex;

    > div{
      flex: 1;
      display: flex;
    }
  }

  .GameTiltContent{
    position: relative;
    font-family: KoHo semibold;
    width: 100%;
    height: 100%;
    padding: 1rem;
    opacity: 0;
    z-index: 3;
    color: #fff;

    h1{
      font-weight: 100;
      font-size: 1rem;
      text-align: center;
      text-shadow: 0 0 8px rgba(0,0,0,.4);
    }
    
    h2{
      font-weight: 100;
      font-size: .8rem;
      position: absolute;
    }

    h2.Date{
      left: 1rem;
      bottom: 2.2rem;
      text-shadow: 0 0 8px rgba(0,0,0,.4);
    }

    h2.Ago{
      left: 1rem;
      bottom: 1rem;
      text-shadow: 0 0 8px rgba(0,0,0,.4);
    }
  }

  &::after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,.8), rgba(0,0,0,.4));
    border-radius: ${props => props.tooRight ? '0 .25rem .25rem 0' : '.25rem 0 0 .25rem'};
    opacity: 0;
    transition: .2s opacity;
    z-index: 2;
  }

  &:hover{
    z-index: 4;
    transform: scale(1.05);

    .GameTiltContent{
      opacity: 1;
    }

    &::after{
      opacity: 1;
    }
    
  }
`

export const GameItemSkeleton = styled.div`
    position: relative;
    aspect-ratio: 3/4;
    z-index: -1;
    border-radius: 0.25rem;
    background-color: rgba(255,255,255,.025);
    overflow: hidden;
    animation: skeleton 1s infinite;

    @keyframes skeleton{
      0%{
        opacity: 1
      }
      50%{
        opacity: .5
      }
      0%{
        opacity: 1
      }
    }
`

export const GameRating = styled.div`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  background-color: orange;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 0.25rem;
  border-top-left-radius: 0.5rem;
  transition: border .2s;
  color: #fff;
  font-family: KoHo semibold;
  font-size: 1rem;
`

interface GameItemVideoProps{
  videoReady?: boolean
  tooRight?: boolean
}

export const GameItemVideo = styled.div<GameItemVideoProps>`
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${props => props.videoReady ? '1' : '0'};
  transform: ${props => props.videoReady ? 'scale(1)' : 'scale(.9)'};
  width: calc(200% + 0.5rem);
  left: 100%;
  padding-left: .5rem;
  height: 100%;
  display: flex;
  z-index: 8;
  overflow: hidden;
  border-radius: 0.25rem;
  transition: transform 0.5s, opacity 0.5s;

  > div{
    flex: 1
  }

  ${props => props.tooRight && css`
    left: unset !important;
    right: 100%;
    padding-left: 0;
    padding-right: 0.5rem;
  `}
`
