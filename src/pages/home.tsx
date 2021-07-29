import { HomeContainer, HomeContentContainer } from '../styles/pages/home'
import GamesLibrarySection from '../components/NewGamesLibrarySection'
import Head from 'next/head'
import RatedGamesGrid from '../components/RatedGamesGrid'
import SearchHeader from '../components/SearchHeader'
import { GetServerSideProps } from 'next'
import { api } from '../services/api'

const Home = ({
  ratedGames,
  reviewedGames,
  topGames,
  newestGames,
  comingGames
}) => {
  /* useEffect(() => {
    if (logged) {
      UserService.getUsers()
    } else {
      AuthService.loginWithGoogle().then(user => {
        console.log(user.user)
        UserService.getUsers()
      })
    } 
  }, []) */

  return (
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <SearchHeader />
      <HomeContentContainer>
        <GamesLibrarySection
          title={`Populares de ${new Date().getFullYear()}`}
          type={'slide'}
          data={ratedGames}
          showRating
        />
        <h1>Revisados recentemente</h1>
        <RatedGamesGrid games={reviewedGames} />
        <GamesLibrarySection
          title="Populares"
          type={'slide'}
          data={topGames}
          showRating
        />
        <GamesLibrarySection
          title="Novidades"
          type={'slide'}
          data={newestGames}
        />
        <GamesLibrarySection
          title="Próximos Lançamentos"
          type={'slide'}
          data={comingGames}
        />
      </HomeContentContainer>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const params = { qtd: 30 }

  const getGames = async () => {
    const ratedGames = api.grapi.get('/games/rating', {
      params
    })
    const topGames = api.grapi.get('/games/top', {
      params
    })
    const newestGames = api.grapi.get('/games/newest', {
      params
    })
    const comingGames = api.grapi.get('/games/coming', {
      params
    })
    const reviewedGames = api.grapi.get('/games/recently-reviewed', {
      params: { qtd: 5 }
    })

    const games = await Promise.all([
      ratedGames,
      topGames,
      newestGames,
      comingGames,
      reviewedGames
    ])

    return {
      ratedGames: games[0].data,
      topGames: games[1].data,
      newestGames: games[2].data,
      comingGames: games[3].data,
      reviewedGames: games[4].data
    }
  }

  const { ratedGames, topGames, newestGames, comingGames, reviewedGames } =
    await getGames()

  return {
    props: { ratedGames, topGames, newestGames, comingGames, reviewedGames }
    // revalidate: 60 * 10 // 10 minutes
  }
}

export default Home
