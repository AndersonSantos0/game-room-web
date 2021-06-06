import { useEffect, useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../styles/pages/home'
import axios from 'axios'
import GamesLibrarySection from '../components/NewGamesLibrarySection'
import Head from 'next/head'
import RatedGamesGrid from '../components/RatedGamesGrid'
import SearchHeader from '../components/SearchHeader'
import UserService from '../services/users'
import AuthService from '../services/auth'

const Home = () => {
  const [topGames, setTopGames] = useState([])
  const [ratedGames, setRatedGames] = useState([])
  const [newestGames, setNewestGames] = useState([])
  const [comingGames, setComingGames] = useState([])
  const [recentlyReviewedGames, setRecentlyReviewedGames] = useState([])
  const [loadingTopGames, setLoadingTopGames] = useState(true)
  const [loadingRatedGames, setLoadingRatedGames] = useState(true)
  const [loadingNewestGames, setLoadingNewestGames] = useState(true)
  const [loadingComingGames, setLoadingComingGames] = useState(true)
  const [loadingRecentlyReviewedGames, setLoadingRecentlyReviewedGames] =
    useState(true)

  const [logged, setLogged] = useState<Promise<boolean> | boolean>(
    AuthService.isLoggedIn
  )

  AuthService.observeStatus(user => setLogged(!!user))

  const params = {
    qtd: 30,
    index: 0
  }

  const getRatedGames = async () => {
    setLoadingRatedGames(true)
    const response = await axios.get('/api/games/rating', {
      params
    })

    setRatedGames(response.data)
    setLoadingRatedGames(false)
  }

  const getTopGames = async () => {
    setLoadingTopGames(true)
    const response = await axios.get('/api/games/top', {
      params
    })

    setTopGames(response.data)
    setLoadingTopGames(false)
  }

  const getNewestGames = async () => {
    setLoadingNewestGames(true)
    const response = await axios.get('/api/games/newest', {
      params
    })

    setNewestGames(response.data)
    setLoadingNewestGames(false)
  }

  const getComingGames = async () => {
    setLoadingComingGames(true)
    const response = await axios.get('/api/games/coming', {
      params
    })

    setComingGames(response.data)
    setLoadingComingGames(false)
  }

  const getRecentlyReviwedGames = async () => {
    setLoadingRecentlyReviewedGames(true)
    const response = await axios.get('/api/games/recently-reviewed', {
      params: {
        qtd: 5,
        index: 0
      }
    })

    setRecentlyReviewedGames(response.data)
    setLoadingRecentlyReviewedGames(false)
  }

  useEffect(() => {
    getTopGames()
    getRatedGames()
    getNewestGames()
    getComingGames()
    getRecentlyReviwedGames()
  }, [])

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
          loading={loadingRatedGames}
          title={`Populares de ${new Date().getFullYear()}`}
          type={'slide'}
          data={ratedGames}
          showRating
        />
        <h1>Revisados recentemente</h1>
        <RatedGamesGrid
          games={recentlyReviewedGames}
          loading={loadingRecentlyReviewedGames}
        />
        <GamesLibrarySection
          loading={loadingTopGames}
          title="Populares"
          type={'slide'}
          data={topGames}
          showRating
        />
        <GamesLibrarySection
          loading={loadingNewestGames}
          title="Novidades"
          type={'slide'}
          data={newestGames}
        />
        <GamesLibrarySection
          loading={loadingComingGames}
          title="Próximos Lançamentos"
          type={'slide'}
          data={comingGames}
        />
      </HomeContentContainer>
    </HomeContainer>
  )
}

export default Home
