import {
  Cover,
  RatedGamesGridContainer,
  RatedGamesGridContent,
  GameRating
} from './styles'
import Tilt from 'react-parallax-tilt'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

type gameGenreType = {
  id: number
  name: string
}

type gameImageType = {
  id: number
  image_id: string
}

type gameType = {
  id: number
  first_release_date: number
  genres?: gameGenreType[]
  name: string
  screenshots?: gameImageType[]
  cover?: gameImageType
  total_rating: number
  total_rating_count: number
  slug: string
}

interface RatedGamesGridProps {
  games: gameType[]
  loading?: boolean
}

interface RatedGameSlideProps {
  screenshots?: gameImageType[]
}

const RatedGameSlide = ({ screenshots }: RatedGameSlideProps) => {
  const [counter, setCounter] = useState(0)
  const CoverRef = useRef<HTMLDivElement>(null)

  const SlideIncrement = () => {
    if (!screenshots) return
    setCounter(prev => (prev + 1 < screenshots.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    const Timer = setInterval(() => {
      SlideIncrement()
    }, 15000)

    return () => clearInterval(Timer)
  }, [])

  return (
    <Cover
      ref={CoverRef}
      length={screenshots ? screenshots.length : 0}
      counter={counter}
    >
      <div className="container">
        {screenshots &&
          screenshots.map(image => {
            return (
              <Image
                key={image.id}
                width={1080}
                height={720}
                objectFit={'cover'}
                src={`https://images.igdb.com/igdb/image/upload/t_720p/${image.image_id}.jpg`}
              />
            )
          })}
      </div>
    </Cover>
  )
}

const RatedGamesGrid = ({
  games = [],
  loading = false
}: RatedGamesGridProps) => {
  const route = useRouter()
  const [loadingSkeletonList] = useState(new Array(5).fill(null))

  const GameHandle = slug => {
    route.push('/game/' + slug)
  }

  if (loading) {
    return (
      <RatedGamesGridContainer>
        {loadingSkeletonList.map((game, idx) => {
          let position = 'item'
          switch (idx) {
            case 0:
              position = 'primary'
              break
            case 1:
              position = 'secondary'
              break
            case 2:
              position = 'terciary'
              break
          }

          return <div key={idx} className={`skeleton ${position}`} />
        })}
      </RatedGamesGridContainer>
    )
  }

  return (
    <RatedGamesGridContainer>
      {games.map((game, idx) => {
        let position = 'item'
        switch (idx) {
          case 0:
            position = 'primary'
            break
          case 1:
            position = 'secondary'
            break
          case 2:
            position = 'terciary'
            break
        }

        return (
          <Tilt
            key={game.id}
            tiltEnable={true}
            tiltMaxAngleX={2}
            tiltMaxAngleY={
              position === 'primary' || position === 'terciary' ? 1 : 2
            }
            tiltReverse
            transitionSpeed={400}
            scale={
              position === 'primary' || position === 'secondary' ? 1.025 : 1.05
            }
            className={position}
          >
            <RatedGameSlide screenshots={game.screenshots} />

            <RatedGamesGridContent onClick={() => GameHandle(game.slug)}>
              <h1>{game.name}</h1>
              <h2>{game.genres && game.genres[game.genres.length - 1].name}</h2>
              <GameRating className={'GameRating'}>
                <p>{Math.floor(game.total_rating)}%</p>
              </GameRating>
            </RatedGamesGridContent>
          </Tilt>
        )
      })}
    </RatedGamesGridContainer>
  )
}

export default RatedGamesGrid
