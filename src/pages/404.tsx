import Head from 'next/head'
import Particles from 'react-particles-js'
import styled from 'styled-components'
import Logo from '../components/Logo'

const NotFoundContainer = styled.div`
  background-color: rgba(0,0,0,.75);
  backdrop-filter: blur(96px);
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  pointer-events: visible;

  section {
    padding: 0 4rem;
    font-family: KoHo semibold;
    position: relative;
    z-index: 1;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`

const NotFoundCodeContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  border-right: solid 1px #666;
  padding: 0 4rem;
  font-family: KoHo semibold;
  position: relative;
  z-index: 1;

  > svg {
    filter: grayscale(0.8);
    animation: FailLogo 2s ease-in-out infinite;
    opacity: .8;
  }

  @keyframes FailLogo {
    0% {
      filter: grayscale(0.6);
    }
    50% {
      filter: grayscale(1);
    }
    100% {
      filter: grayscale(0.6);
    }
  }
`

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
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.02,
            },
            move: {
              direction: 'none',
              speed: 0.1,
            },
            size: {
              value: 1.1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: 'repulse',
              },
              onHover:{
                enable: true,
                mode: 'connect',
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
    </NotFoundContainer>
  )
}

export default NotFound
