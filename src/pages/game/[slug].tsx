import moment from 'moment'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { api } from '../../services/api'
import { PieChart } from 'react-minimal-pie-chart'
import {
  CriticRating,
  GameBackCover,
  GameCover,
  GameInfo,
  GameScreenContainer,
  GameScreenContent,
  ScreenshotsArrowsContainer,
  ScreenshotsContainer,
  ScreenshotsDots,
  TotalRating
} from '../../styles/pages/game'
import NotFound from '../404'
import { useState } from 'react'
import Carousel, { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import YouTube from 'react-youtube'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useImageView } from '../../contexts/ImageViewerContext'

const responsive = {
  eight: {
    breakpoint: { max: 3000, min: 0 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 8
  }
}

type NameType = {
  id: number
  name: string
}

type ImageType = {
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
  screenshots?: ImageType[]
  storyline?: string
  summary?: string
  videos?: VideosType[]
  involved_companies?: CompanyType[]
  genres?: NameType[]
  aggregated_rating?: number
  total_rating?: number
  aggregated_rating_count?: number
  total_rating_count?: number
  platforms?: NameType[]
  artworks?: ImageType[]
}

interface GameScreenProps {
  game: GameType | 'not-found'
}

const CustomDots = ({ active, onClick }: DotProps) => (
  <ScreenshotsDots active={active} onClick={onClick} />
)

const CustomButtonGroupAsArrows = ({ previous, next }: ButtonGroupProps) => (
  <ScreenshotsArrowsContainer>
    <button style={{ pointerEvents: 'all' }} onClick={previous}>
      <HiOutlineChevronLeft color="#fff" size={'2.5rem'} />
    </button>
    <button style={{ pointerEvents: 'all' }} onClick={next}>
      <HiOutlineChevronRight color="#fff" size={'2.5rem'} />
    </button>
  </ScreenshotsArrowsContainer>
)

const GameScreen = ({ game }: GameScreenProps) => {
  if (game === 'not-found') return <NotFound />

  const [randomScreenShot] = useState(
    Math.floor(Math.random() * (game.screenshots?.length - 1))
  )
  const { showImage } = useImageView()

  const [publisher] = useState(
    game.involved_companies &&
      (game.involved_companies.filter(company => company.publisher).length > 0
        ? game.involved_companies?.filter(company => company.publisher)[0]
            .company.name
        : game.involved_companies[0].company.name)
  )

  return (
    <GameScreenContainer>
      <Head>
        <title>{'Game room - ' + game?.name}</title>
      </Head>
      <GameBackCover
        style={{
          backgroundImage: `url(${
            game?.screenshots &&
            'https://images.igdb.com/igdb/image/upload/t_720p/' +
              game.screenshots[randomScreenShot].image_id +
              '.png'
          })`
        }}
      />
      <GameScreenContent>
        {/* <SearchHeader fixed /> */}
        <header>
          <GameCover
            style={{ cursor: game.cover ? 'pointer' : 'default' }}
            onClick={() => game.cover && showImage(game.cover.image_id)}
          >
            <Image
              objectFit={'cover'}
              width={400}
              height={600}
              src={
                game?.cover
                  ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`
                  : '../default-cover.png'
              }
            />
          </GameCover>
          <GameInfo>
            <h1>{game?.name}</h1>
            {game?.first_release_date && (
              <h2>
                {moment(game.first_release_date * 1000.05).format(
                  'MMMM Do YYYY'
                )}{' '}
                ({moment(game.first_release_date * 1000).fromNow()})
              </h2>
            )}
            <h3>{publisher}</h3>
            <p>{game.genres?.map(genre => genre.name).join(', ')}</p>
          </GameInfo>
          {game?.total_rating && (
            <TotalRating>
              <PieChart
                data={[
                  {
                    value: Math.floor(game.total_rating),
                    color: 'var(--primary)'
                  }
                ]}
                totalValue={100}
                segmentsShift={0}
                lineWidth={16}
                rounded={true}
              />
              <h1>{Math.round(game.total_rating)}</h1>
              <h2>{game.total_rating_count} total ratings</h2>
            </TotalRating>
          )}
          {game?.aggregated_rating && (
            <CriticRating>
              <PieChart
                data={[
                  {
                    value: Math.floor(game.aggregated_rating),
                    color: 'orange'
                  }
                ]}
                totalValue={100}
                segmentsShift={0}
                lineWidth={16}
                rounded={true}
              />
              <h1>{Math.round(game.aggregated_rating)}</h1>
              <h2>{game.aggregated_rating_count} critic ratings</h2>
            </CriticRating>
          )}
        </header>
        <section>
          <div>
            <button>Favorite</button>
            {game.platforms && (
              <p>
                <h3>Platforms: </h3>
                {game.platforms.map((platform, idx) => (
                  <span key={idx}>
                    <a href="#">{platform.name}</a>
                    {idx + 1 === game.platforms.length ? '' : ', '}
                  </span>
                ))}
              </p>
            )}
          </div>
          <main>
            <p>{game.summary}</p>
            <p>{game.storyline}</p>
          </main>
          {game.total_rating_count && <div />}
        </section>
        {(game.artworks || game.videos || game.screenshots) && (
          <ScreenshotsContainer>
            <h1>Media</h1>
            <Carousel
              arrows={false}
              infinite
              showDots
              draggable
              responsive={responsive}
              centerMode
              keyBoardControl
              customTransition="ease 450ms"
              containerClass="container"
              dotListClass="dots"
              itemClass="screenshot"
              renderDotsOutside
              customDot={<CustomDots />}
              customButtonGroup={<CustomButtonGroupAsArrows />}
            >
              {game.videos?.map(video => (
                <div key={video.id}>
                  <YouTube
                    videoId={video.video_id}
                    containerClassName="video"
                    opts={{
                      height: '100%',
                      width: '100%',
                      playerVars: {
                        showinfo: 0,
                        controls: 0,
                        disablekb: 1,
                        modestbranding: 1,
                        fs: 0,
                        hl: 'pt',
                        iv_load_policy: 3,
                        enablejsapi: 1
                      }
                    }}
                  />
                </div>
              ))}
              {game.artworks?.map(image => (
                <div key={image.id} onClick={() => showImage(image.image_id)}>
                  <Image
                    draggable={false}
                    objectFit={'cover'}
                    width={1280}
                    height={720}
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.png`}
                  />
                </div>
              ))}
              {game.screenshots?.map(image => (
                <div key={image.id} onClick={() => showImage(image.image_id)}>
                  <Image
                    draggable={false}
                    objectFit={'cover'}
                    width={1280}
                    height={720}
                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.png`}
                  />
                </div>
              ))}
            </Carousel>
          </ScreenshotsContainer>
        )}
      </GameScreenContent>
    </GameScreenContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params
  let data
  await api.grapi
    .get(`games/${slug}`)
    .then(response => (data = response.data))
    .catch(() => {
      data = 'not-found'
    })

  return {
    props: {
      game: data
    },
    revalidate: 60 * 60 * 24 * 1 // 24 hours
  }
}

export default GameScreen
