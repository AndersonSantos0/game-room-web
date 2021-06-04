import React from 'react'
import { api } from '../../../services/api'
import GamesLibrarySection from '../../../components/NewGamesLibrarySection'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import SearchHeader from '../../../components/SearchHeader'
import Logo from '../../../components/Logo'
import { useRouter } from 'next/router'
import { SearchContainer, SearchContentContainer, BlankGamesSearch } from '../../../styles/pages/search'

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
  category: number
}

interface SearchScreenProps {
  games: GameType[]
}

const SearchScreen = ({ games }: SearchScreenProps) => {
  /*const compareCategory = (a: GameType, b: GameType) => {
    return a.category - b.category
  }*/

  const {query} = useRouter()

  const compareRelease = (a: GameType, b: GameType) => {
    if (a.total_rating_count < b.total_rating_count) {
      return 1
    }
    if (a.total_rating_count > b.total_rating_count) {
      return -1
    }
    return 0
  }

  return (
    <SearchContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <SearchHeader />
      <SearchContentContainer>
        {games.length === 0 ? (
          <BlankGamesSearch>
            <Logo size={'8rem'} />
            <div>
              <h1>Oops, não encontramos nada relacionado a "{query.game}"</h1>
              <h2>Tente pesquisar algo diferente</h2>
            </div>
          </BlankGamesSearch>
        ) : (
          <GamesLibrarySection
            loadingItemsCount={50}
            type={'grid'}
            data={games
              .map((game) => {
                return {
                  ...game,
                  total_rating_count: game.total_rating_count
                    ? game.total_rating_count
                    : 0,
                }
              })
              .sort(compareRelease)}
          />
        )}
      </SearchContentContainer>
    </SearchContainer>
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
        qtd: 100,
        index: 0,
        game,
      }
    })
    .then((response) => (data = response.data))
    .catch((error) => {
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
