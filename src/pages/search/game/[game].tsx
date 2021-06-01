import React from 'react'
import { HomeContainer, HomeContentContainer } from '../../../styles/pages/home'
import { api, getGRBT } from '../../../services/api'
import GamesLibrarySection from '../../../components/NewGamesLibrarySection'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import SearchHeader from '../../../components/SearchHeader'
import styled from 'styled-components'
import Logo from '../../../components/Logo'
import { useRouter } from 'next/router'

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

const BlankGamesSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  padding: 0 4rem;

  svg {
    filter: grayscale(0.5);
    animation: FailLogo 2s ease-in-out infinite;
  }

  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    h1 {
      color: #fff;
      font-family: KoHo semibold;
      font-weight: 100;
      max-width: 60%;
    }

    h2{
      color: #aaa;
      font-family: KoHo semibold;
      font-weight: 100;
    }
  }
`

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
    <HomeContainer>
      <Head>
        <title>Game room</title>
      </Head>
      <SearchHeader />
      <HomeContentContainer>
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
        qtd: 100,
        index: 0,
        game,
      },
      headers: {
        Authorization: await getGRBT(),
      },
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
