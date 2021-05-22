import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import AsideMenu from '../components/AsideMenu'
import styled from 'styled-components'

import '../styles/fonts.css'

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

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <MainApp>
        <div className="AppContainer" >
          <AsideMenu />
          <Component {...pageProps} />
        </div>
      </MainApp>

      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
