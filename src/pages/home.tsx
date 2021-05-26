import React, { useEffect, useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../styles/pages/home'
import axios from 'axios'
import { getGRBT } from '../services/api'
import GamesLibrarySection from '../components/GamesLibrarySection'
import Head from 'next/head'
import RatedGamesGrid from '../components/RatedGamesGrid'
import { useRouter } from 'next/router'

const { API_URL } = process.env

const Home = () => {
  const [ratedGames, setRatedGames] = useState([])
  const [newestGames, setNewestGames] = useState([])
  const [comingGames, setComingGames] = useState([])
  const [recentlyReviewedGames, setRecentlyReviewedGames] = useState([])
  const [loadingRatedGames, setLoadingRatedGames] = useState(true)
  const [loadingNewestGames, setLoadingNewestGames] = useState(true)
  const [loadingComingGames, setLoadingComingGames] = useState(true)
  const [loadingRecentlyReviewedGames, setLoadingRecentlyReviewedGames] = useState(true)

  useEffect(() => {
    getRatedGames()
    getNewestGames()
    getComingGames()
    getRecentlyReviwedGames()
  }, [])

  const getRatedGames = async () => {
    setLoadingRatedGames(true)
    const response = await axios.get('/api/games/rating', {
      params: {
        qtd: 32,
        index: 0,
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    console.log(response.data)

    setRatedGames(response.data)
    setLoadingRatedGames(false)
  }

  const getNewestGames = async () => {
    setLoadingNewestGames(true)
    const response = await axios.get('/api/games/newest', {
      params: {
        qtd: 32,
        index: 0,
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setNewestGames(response.data)
    setLoadingNewestGames(false)
  }

  const getComingGames = async () => {
    setLoadingComingGames(true)
    const response = await axios.get('/api/games/coming', {
      params: {
        qtd: 32,
        index: 0,
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setComingGames(response.data)
    setLoadingComingGames(false)
  }

  const getRecentlyReviwedGames = async () => {
    setLoadingRecentlyReviewedGames(true)
    const response = await axios.get('/api/games/recently-reviewed', {
      params: {
        qtd: 5,
        index: 0,
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setRecentlyReviewedGames(response.data)
    setLoadingRecentlyReviewedGames(false)
  }

  return (
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <HomeContentContainer>
        <h1>Revisados recentemente</h1>
        {API_URL}
        <RatedGamesGrid games={recentlyReviewedGames} loading={loadingRecentlyReviewedGames} />
        <GamesLibrarySection
          loading={loadingRatedGames}
          title={`Populares de ${new Date().getFullYear()}`}
          type={'slide'}
          data={ratedGames}
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
