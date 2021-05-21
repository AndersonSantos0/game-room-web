import React from 'react'
import { AppProps } from 'next/app'
import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import AsideMenu from '../components/AsideMenu'
import styled from 'styled-components'

import '../styles/fonts.css'
import Particles from 'react-particles-js'

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
        
        <Particles
        params={{
          particles: {
            number: {
              value: 10,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            color: {
              value: "#339AFF"
            },
            line_linked: {
              enable: false,
            },
            size: {
              value: 50,
            },
            move:{
              direction: 'none'
            },
            opacity: {
              value: 1,
              anim: {
                enable: false,
                opacity_min: 1,
                speed: 1,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: 'push',
              }
            },
            modes: {
              push: {
                particles_nb: 1,
              },
            },
          },
          retina_detect: true,
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
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
