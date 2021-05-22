import React, { useEffect, useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../styles/pages/home'
import axios from 'axios'
import { getGRBT } from '../services/api'
import GamesLibrarySection from '../components/GamesLibrarySection'
import Head from 'next/head'

const Home = () => {
  const [ratedGames, setRatedGames] = useState([])
  const [newestGames, setNewestGames] = useState([])
  const [loadingRatedGames, setLoadingRatedGames] = useState(true)
  const [loadingNewestGames, setLoadingNewestGames] = useState(true)

  useEffect(() =>{
    getRatedGames()
    getNewestGames()
  },[])

  const getRatedGames = async () => {
    setLoadingRatedGames(true)
    const response = await axios.get('/api/games', {
      params:{
        qtd: 9,
        index: 0,
        section: 'rating'
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setRatedGames(response.data)
    setLoadingRatedGames(false)
  }

  const getNewestGames = async () => {
    setLoadingNewestGames(true)
    const response = await axios.get('/api/games', {
      params:{
        qtd: 9,
        index: 0,
        section: 'newest'
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })

    setNewestGames(response.data)
    setLoadingNewestGames(false)
  }

  return (
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <HomeContentContainer>
        <GamesLibrarySection loading={loadingRatedGames} title="Populares" type={"slide"} data={ratedGames} showRating />
        {true && <GamesLibrarySection loading={loadingNewestGames} title="Novidades" type={"slide"} data={newestGames} />}
      </HomeContentContainer>
    </HomeContainer>
  )
}

export default Home
