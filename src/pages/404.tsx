import Head from 'next/head'
import Particles from 'react-particles-js'
import Logo from '../components/Logo'
import { NotFoundCodeContainer, NotFoundContainer } from '../styles/pages/errors'

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Head>
        <title>Not found</title>
      </Head>
      <NotFoundCodeContainer>
        <Logo size={'8rem'} />
        <h1>404</h1>
      </NotFoundCodeContainer>
      <section>
        <h1>Oops</h1>
        <p>
          Nos infiltramos no lugar errado, precisamos voltar
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
    </NotFoundContainer>
  )
}

export default NotFound
