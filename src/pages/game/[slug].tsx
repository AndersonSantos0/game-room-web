import moment from 'moment'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { api, getGRBT } from '../../services/api'
import { PieChart } from 'react-minimal-pie-chart'
import {
  CriticRating,
  GameBackCover,
  GameCover,
  GameInfo,
  GameScreenContainer,
  GameScreenContent,
  TotalRating,
} from '../../styles/pages/game'

type ScreenshotType = {
  id: number
  image_id: string
}

type VideosType = {
  id: number
  video_id: string
}

type CompanyType = {
  id: number
  company: {
    id: number
    name: string
  }
  publisher: boolean
}

type GameType = {
  id: number
  cover?: {
    id: number
    image_id: string
  }
  first_release_date?: number
  name: string
  screenshots?: ScreenshotType[]
  storyline?: string
  summary?: string
  videos?: VideosType[]
  involved_companies?: CompanyType[]
  aggregated_rating?: number
  total_rating?: number
}

interface GameScreenProps {
  game: GameType | 'not-found'
}

const GameScreen = ({ game }: GameScreenProps) => {
  const route = useRouter()

  if (game === 'not-found') return <h1>test</h1>

  return (
    <GameScreenContainer>
      <Head>
        <title>{'Game room - ' + game.name}</title>
      </Head>
      <GameBackCover>
        <Image
          objectFit={'cover'}
          width={1080}
          height={600}
          src={
            'https://images.igdb.com/igdb/image/upload/t_720p/' +
            game.screenshots[
              Math.floor(Math.random() * (game.screenshots.length - 1))
            ].image_id +
            '.png'
          }
        />
      </GameBackCover>
      <GameScreenContent>
        <header>
          <GameCover>
            <Image
              objectFit={'cover'}
              width={400}
              height={600}
              src={
                'https://images.igdb.com/igdb/image/upload/t_cover_big/' +
                game.cover.image_id +
                '.png'
              }
            />
          </GameCover>
          <GameInfo>
            <h1>{game.name}</h1>
            {game.first_release_date && (
              <h2>
                {moment(game.first_release_date * 1000.05).format(
                  'MMMM Do YYYY'
                )}{' '}
                ({moment(game.first_release_date * 1000).fromNow()})
              </h2>
            )}
            <h3>
              {
                game.involved_companies.filter(
                  (company) => company.publisher
                )[0].company.name
              }
            </h3>
          </GameInfo>
          <TotalRating>
            <PieChart
              data={[
                {
                  value: Math.floor(game.total_rating),
                  color: 'var(--primary)',
                },
              ]}
              totalValue={100}
              segmentsShift={0}
              lineWidth={16}
              rounded={true}
            />
            <h1>{Math.round(game.total_rating)}</h1>
          </TotalRating>
          <CriticRating>
            <PieChart
              data={[{ value: Math.floor(game.aggregated_rating), color: 'orange' }]}
              totalValue={100}
              segmentsShift={0}
              lineWidth={16}
              rounded={true}
            />
            <h1>{Math.round(game.aggregated_rating)}</h1>
          </CriticRating>
        </header>
      </GameScreenContent>
    </GameScreenContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params
  let data
  await api.grapi
    .get(`games/${slug}`, {
      headers: {
        Authorization: await getGRBT(),
      },
    })
    .then((response) => (data = response.data))
    .catch(error =>{
      console.log(error)
      data = 'not-found'
    })

  return {
    props: {
      game: data,
    },
    revalidate: 60 * 60 * 24 * 1, // 24 hours
  }
}

export default GameScreen
