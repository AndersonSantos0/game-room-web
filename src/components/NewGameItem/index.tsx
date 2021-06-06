import {
  GameItemContainer,
  GameItemSkeleton,
  GameItemVideo,
  GameRating
} from './styles'
import { useRef, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import YouTube from 'react-youtube'
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
  total_rating?: number
  videos?: videoType[]
  total_rating_count?: number
  slug: string
}

interface GameItemProps {
  game: 'seemore' | 'skeleton' | GameType
  showRating?: boolean
  slidemode?: boolean
  slideVars?: {
    slideWidth: number
    slideOffset: number
  }
}

const GameItem = ({ game, showRating = false }: GameItemProps) => {
  const GameItemRef = useRef<HTMLDivElement>(null)
  const route = useRouter()
  const [tooRight, setTooRight] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  const isTooRight = () => {
    return (
      GameItemRef.current.offsetWidth * 3.5 +
        GameItemRef.current.getBoundingClientRect().x -
        GameItemRef.current.offsetWidth >
      window.innerWidth
    )
  }

  const GameItemHandle = slug => {
    route.push('/game/' + slug)
  }

  if (typeof game === 'object') {
    return (
      <GameItemContainer
        className={'GameTiltContainer'}
        onClick={() => GameItemHandle(game.slug)}
        onMouseEnter={() => {
          setShowVideo(true)
          setTooRight(isTooRight())
          setVideoReady(false)
        }}
        onMouseLeave={() => setShowVideo(false)}
        ref={GameItemRef}
      >
        <div className="GameTiltContent">
          <h1>{game.name}</h1>
          {game.first_release_date && (
            <>
              <h2 className="Date">
                {moment(game.first_release_date * 1000.05).format(
                  'MMMM Do YYYY'
                )}
              </h2>
              <h2 className="Ago">
                {moment(game.first_release_date * 1000).fromNow()}
              </h2>
            </>
          )}
        </div>
        <div className="cover">
          <Image
            src={
              game.cover
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                : '../../default-cover.png'
            }
            height={512}
            width={448}
          />
        </div>
        {showRating && game.total_rating && game.total_rating > 0 && (
          <GameRating className={'GameRating'}>
            <p>{Math.floor(game.total_rating)}</p>
          </GameRating>
        )}
        {game.videos && showVideo && (
          <GameItemVideo tooRight={tooRight} videoReady={videoReady}>
            <YouTube
              videoId={game.videos[0].video_id}
              containerClassName="video"
              onReady={() => setVideoReady(true)}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
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
          </GameItemVideo>
        )}
      </GameItemContainer>
    )
  }

  if (game === 'skeleton') {
    return <GameItemSkeleton />
  }
}

export default GameItem
