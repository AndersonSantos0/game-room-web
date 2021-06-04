import styled from 'styled-components'

export const ImageViewerContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: imageviewerenter .4s;

  > img{
    z-index: 4;
    position: relative;
    max-width: 75%;
    max-height: calc(100% - 2rem);
    border-radius: .25rem ;
  }

  @keyframes imageviewerenter{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`

export const ImageViewerBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
  backdrop-filter: blur(8px);
  position: absolute;
`
