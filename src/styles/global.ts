import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root{
    --primary: ${props => props.theme.colors.primaryColor};
    --secondary: ${props => props.theme.colors.secondaryColor};
    --background: ${props => props.theme.colors.background}
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-family: 'Roboto' ,-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  background-color: #333;
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  }

  html {
    font-size: 100%;
  }

  @media (max-width: 1080px) {
    html{
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html{
      font-size: 87.5%;
    }
  }
`
