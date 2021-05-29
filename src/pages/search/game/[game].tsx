import React, { useState } from 'react'
import { HomeContainer, HomeContentContainer } from '../../../styles/pages/home'
import { api, getGRBT } from '../../../services/api'
import GamesLibrarySection from '../../../components/NewGamesLibrarySection'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import SearchHeader from '../../../components/SearchHeader'

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

interface SearchScreenProps{
  games: GameType[]
}

const SearchScreen = ({games}: SearchScreenProps) => {
  return (
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <SearchHeader />
      <HomeContentContainer>
      <GamesLibrarySection
          loadingItemsCount={48}
          type={'grid'}
          data={games}
        />
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
await api.grapi.get('/games/search', {
    params: {
      qtd: 48,
      index: 0,
      game
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
