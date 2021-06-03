import React, { useEffect, useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../styles/pages/home'
import axios from 'axios'
import { getGRBT } from '../services/api'
import GamesLibrarySection from '../components/NewGamesLibrarySection'
import Head from 'next/head'
import RatedGamesGrid from '../components/RatedGamesGrid'
import SearchHeader from '../components/SearchHeader'

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

  useEffect(() => {
    getTopGames()
    getRatedGames()
    getNewestGames()
    getComingGames()
    getRecentlyReviwedGames()
  }, [])

  const params = {
    qtd: 30,
    index: 0,
  }

  const getRatedGames = async () => {
    setLoadingRatedGames(true)
    const response = await axios.get('/api/games/rating', {
      params,
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setRatedGames(response.data)
    setLoadingRatedGames(false)
  }

  const getTopGames = async () => {
    setLoadingTopGames(true)
    const response = await axios.get('/api/games/top', {
      params,
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setTopGames(response.data)
    setLoadingTopGames(false)
  }

  const getNewestGames = async () => {
    setLoadingNewestGames(true)
    const response = await axios.get('/api/games/newest', {
      params,
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
      params,
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
