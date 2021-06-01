import React, { useEffect, useRef, useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../../../styles/pages/home'
import { api, getGRBT } from '../../../services/api'
import GamesLibrarySection from '../../../components/NewGamesLibrarySection'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import SearchHeader from '../../../components/SearchHeader'
import { useRouter } from 'next/router'
import Lottie from 'react-lottie'

import loadingJson from '../../../animations/loading.json'
import { LoadingContainer } from '../../../styles/pages/game'

type videoType = {
  id: number
  video_id: string
}

type GameType = {
  id: number
  cover?: {
    id: number
    image_id: string
  }
  first_release_date: number
  name: string
  summary: string
  videos?: videoType[]
  total_rating_count?: number
  slug: string
}

interface SearchScreenProps {
  games: GameType[]
}

const SearchScreen = ({ games }: SearchScreenProps) => {
  const { query } = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [gamesData, setGamesData] = useState(games)
  const [page, setPage] = useState(1)
  const [endReached, setEndReached] = useState(false)

  useEffect(()=>{
    setGamesData(games)
    setEndReached(false)
    console.log(games.length)
    if(games.length < 40)setEndReached(true)
    setPage(1)
    scrollRef.current.scrollTop = 0
  },[games])

  useEffect(()=>{
    let load = false
    const isScrollEnd = () => scrollRef.current.scrollTop + scrollRef.current.offsetHeight > scrollRef.current.scrollHeight - 200

    const getNextPage = () =>{
      console.log(isScrollEnd())
      if(isScrollEnd()){
        if(load)return
        load = true
        getMoreGames().then(()=>load = false)
      }
    }

    scrollRef.current.addEventListener('scroll',getNextPage)

    return () => scrollRef.current.removeEventListener('scroll',getNextPage)
  },[page, games])

  const getMoreGames = async () => {
    console.log(endReached)
    if (endReached)return

    console.log(query.game, page)

    await api.grapi
      .get('/games/search', {
        params: {
          qtd: 50,
          index: page,
          game: query.game,
        },
        headers: {
          Authorization: await getGRBT(),
        },
      })
      .then((response) => {
        console.log('teste: ' + response.data.length)
        setGamesData([...gamesData, ...response.data])
        if (response.data.length < 50) setEndReached(true)
        setPage(page + 1)
      })
  }

  return (
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <SearchHeader />
      <HomeContentContainer ref={scrollRef} >
        <GamesLibrarySection
          loadingItemsCount={50}
          type={'grid'}
          data={gamesData}
        />
        {!endReached && <LoadingContainer>
          <div>
            <Lottie
              width={'8rem'}
              height={'8rem'}
              options={{
                loop: true,
                autoplay: true,
                animationData: loadingJson,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
            />
            <h1>Loading...</h1>
          </div>
        </LoadingContainer>}
      </HomeContentContainer>
    </HomeContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { game } = ctx.params
  let data
  await api.grapi
    .get('/games/search', {
      params: {
        qtd: 50,
        index: 0,
        game,
      },
      headers: {
        Authorization: await getGRBT(),
      },
    })
    .then((response) => (data = response.data))
    .catch((error) => {
      console.log(error)
      data = 'not-found'
    })

  return {
    props: {
      games: data,
    },
    revalidate: 60 * 60 * 24 * 1, // 24 hours
  }
}

export default SearchScreen
