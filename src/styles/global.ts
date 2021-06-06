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
  height: 100%;

    #__next{
      height: 100%;
    }
  }

  html {
    font-size: 100%;
    height: 100%;
  }

  .react-calendar {
    position: absolute;
    bottom: calc(100% + 1rem);
    background-color: #333;
    border: none;
    border-radius: 4px;

    .react-calendar__navigation {
      margin-bottom: 0;

      button {
        color: #fff;

        :hover {
          background-color: #222;
        }

        :focus {
          background-color: #222;
        }
      }

      button[disabled] {
        background-color: #000;
      }
    }

    .react-calendar__viewContainer {
      .react-calendar__year-view {
        .react-calendar__year-view__months {
          .react-calendar__tile {
            color: #fff;
            &:hover {
              background-color: #222;
            }
          }

          .react-calendar__tile--now {
            background-color: #666;
            border-radius: 4px;
          }

          .react-calendar__tile--hasActive {
            background-color: var(--primary);
            border-radius: 4px;
          }
        }
      }
      .react-calendar__month-view {
        .react-calendar__month-view__weekdays {
          font-size: .8rem;
          abbr {
            text-decoration: none;
          }
        }

        .react-calendar__month-view__days {
          .react-calendar__month-view__days__day {
            color: #fff;
            border-radius: 4px;

            &:hover {
              background-color: #222;
            }

            &.react-calendar__month-view__days__day--weekend {
              color: orange;
            }

            &.react-calendar__month-view__days__day--neighboringMonth {
              color: #999;
            }

            &.react-calendar__tile--now {
              background-color: #999;
              color: #fff;
            }

            &.react-calendar__tile--active {
              background-color: var(--primary);
              color: #fff;
            }
          }
        }
      }
    }
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
