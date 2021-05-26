import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import GlobalStyles from '../styles/global'
import { css, ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import AsideMenu from '../components/AsideMenu'
import styled from 'styled-components'

import '../styles/fonts.css'
import { useRouter } from 'next/router'

const MainApp = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  

  > .AppContainer{
    position: relative;
    display: flex;
    flex: 1;
    overflow-y: auto;
  }
`

interface LoadingBarProps{
  loading: boolean | number
}

const LoadingBar = styled.div<LoadingBarProps>`
  position: absolute;
  height: 2px;
  width: calc(100% - 4rem);
  top: ${props => props.loading ? 0 : -4}px;
  right: 0;
  z-index: 2;
  background-color: var(--primary);
  overflow: hidden;

  &:after{
    content: '';
    position: absolute;
    width: 64px;
    height: 32px;
    left: 100%;
    top: 100%;
    background: var(--secondary);
    transform: rotateZ(45deg) translate(-50%);
    ${props => props.loading && css`
      animation: routeLoading 3s infinite;
    `}
  }

  @keyframes routeLoading{
    0%{
      left: 0;
    }
    50%{
      left: 100%;
    }
    100%{
      left: 0
    }
  }
`

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  const route = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true)
    }

    const handleRouteChanged = (url) =>{
      setLoading(false)
    } 

    route.events.on('routeChangeStart', handleRouteChange)
    route.events.on('routeChangeComplete', handleRouteChanged)

    return ()=>{
      route.events.off('routeChangeStart', handleRouteChange)
      route.events.off('routeChangeComplete', handleRouteChanged)
    }
  },[])

  return (
    <ThemeProvider theme={theme}>
      <MainApp>
        <div className="AppContainer" >
          <AsideMenu />
          <LoadingBar loading={loading ? 1 : 0} />
          <Component {...pageProps} />
        </div>
      </MainApp>

      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
