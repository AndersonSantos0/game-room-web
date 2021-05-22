import styled, { css } from "styled-components";

interface GameItemContainerProps {
  image?: string
  tooRight?: boolean
}

export const GameItemContainer = styled.div<GameItemContainerProps>`
  position: relative;
  margin: 0 auto;
  user-select: none;
  scroll-snap-align: start;
  padding: 0 1rem;

    .seemore{
      position: relative;
      width: 12rem;
      height: 16rem;
      border-radius: 0.25rem;
      background-color: #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      gap: 2rem;

      h1{
        font-family: KoHo semibold;
        font-weight: 100;
      }
    }

    .skeleton{
      position: relative;
      top: 0;
      left: 0;
      z-index: -1;
      width: 12rem;
      height: 16rem;
      border-radius: 0.25rem;
      background-color: rgba(255,255,255,.025);
      overflow: hidden;

      &:after{
        content: '';
        position: absolute;
        width: 8rem;
        background: rgba(255,255,255,.01);
        height: 150%;
        transform: translate(-50%, 50%) rotateZ(-45deg);
        bottom: 0;
        left: 0;
        animation: skeleton 3s infinite;

        @keyframes skeleton{
          0%{
            bottom: -4rem;
            left: -4rem;
          }
          100%{
            bottom: 20rem;
            left: 18rem;
          }
        }
      }
    }

    .GameTiltContainer{
      position: relative;
      width: 12rem;
      height: 16rem;
      transform-style: preserve-3d;

      .cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 0.25rem;
        transition: border-radius .2s;
        overflow: hidden;
        background: #333;
      }

      .FavoriteIcon{
        position: absolute;
        right: .5rem;
        top: .5rem;
        color: var(--primary);
        filter: drop-shadow(0 0 8px var(--primary));
        z-index: 1;
      }

      .GameTiltContent{
        width: 100%;
        height: 100%;
        padding: 1rem;
        opacity: 0;

        h1{
          color: #fff;
          font-family: KoHo semibold;
          font-weight: 100;
          font-size: 1rem;
          text-align: center;
          text-shadow: 0 0 8px rgba(0,0,0,.4);
          position: relative;
          z-index: 3;
        }
      }

      &::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,.8), transparent);
        border-radius: ${props => props.tooRight ? '0 .25rem .25rem 0' : '.25rem 0 0 .25rem'};
        opacity: 0;
        transition: .2s opacity;
        z-index: 2;
      }

      &:hover{
        z-index: 2;
        border-radius: .25rem 0 0 .25rem;

        .cover{
          border-radius: ${props => props.tooRight ? '0 .25rem .25rem 0' : '.25rem 0 0 .25rem'};
        }

        .GameTiltContent{
          opacity: 1;
        }

        &::after{
          opacity: 1;
          backdrop-filter: blur(8px);
        }
        
        .GameActions{
          width: 2.5rem !important;
          box-shadow: 8px 0 8px rgba(0,0,0,.4)
        }

        .GameRating{
          border-bottom-right-radius: 0 !important;
        }
      }

      ${props => props.tooRight && css`

        &:hover{
          border-radius: 0 .25rem .25rem 0;

          .GameRating{
            border-bottom-right-radius: 0.25rem !important;
          }
        }

        .GameActions{
          left: unset !important;
          right: 12rem;
          border-radius: .25rem 0 0 .25rem !important;

          .GameActionsContainer{
            left: 0;
            right: unset !important;
          }
        }
      `}
    }

`

export const GameItemActions = styled.div`
  position: absolute;
  left: 12rem;
  top: 0;
  height: 100%;
  width: 0;
  background: #222;
  transition: .2s width;
  overflow: hidden;
  border-radius: 0 .25rem .25rem 0;

  .GameActionsContainer{
    right: 0;
  }
`

export const GameItemActionsContainer = styled.div`
  position: absolute;
  width: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .GameActionButton{
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .GameActionIcon{
      color: #fff;
      transition: transform .2s;
    }

    &:hover{
      .GameActionIcon{
        transform: scale(1.2);
      }
    }

    &:active{
      .GameActionIcon{
        transform: scale(0.8);
        color: #aaa;
      }
    }

    &.active{
      .GameActionIcon{
        color: var(--primary)
      }
    }
  }  
`

export const GameRating = styled.div`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  background-color: orange;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 0.25rem;
  border-top-left-radius: 0.5rem;
  transition: border .2s;
  color: #fff;
  font-family: KoHo semibold;
`