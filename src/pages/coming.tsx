import Head from 'next/head'
import Particles from 'react-particles-js'
import Logo from '../components/Logo'
import { ComingCodeContainer, ComingContainer } from '../styles/pages/errors'

const ComingScreen = () => {
  return (
    <ComingContainer>
      <Head>
        <title>Em construção</title>
      </Head>
      <ComingCodeContainer>
        <Logo size={'8rem'} />
      </ComingCodeContainer>
      <section>
        <h1>Oops</h1>
        <p>
          Página em construção, volte aqui em alguns dias, talvez esse caminho esteja disponível para se explorar
        </p>
      </section>
      <Particles
        params={{
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 1500
              }
            },
            line_linked: {
              enable: true,
              opacity: 0.02
            },
            move: {
              direction: 'none',
              speed: 0.1
            },
            size: {
              value: 1.1
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05
              }
            }
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: 'repulse'
              },
              onHover: {
                enable: true,
                mode: 'connect'
              }
            },
            modes: {
              push: {
                particles_nb: 1
              }
            }
          },
          retina_detect: true
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0
        }}
      />
    </ComingContainer>
  )
}

export default ComingScreen
