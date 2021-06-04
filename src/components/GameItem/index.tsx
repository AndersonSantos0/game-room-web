import {
  GameItemActions,
  GameItemActionsContainer,
  GameItemContainer,
  GameRating,
  GameInfoBlock
} from './styles'
import Tilt from 'react-parallax-tilt'
import { FaHeart } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
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

const GameItem = ({
  game,
  showRating = false,
  slidemode = false,
  slideVars
}: GameItemProps) => {
  const GameItemRef = useRef<HTMLDivElement>(null)
  const route = useRouter()
  const [tooRight, setTooRight] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const isTooRight = () => {
    const rem = Number(
      window
        .getComputedStyle(document.documentElement, null)
        .getPropertyValue('font-size')
        .replace('px', '')
    )

    if (slidemode) {
      return (
        slideVars.slideWidth +
          slideVars.slideOffset -
          GameItemRef.current?.offsetLeft <
        rem * 35
      )
    }

    return window.innerWidth - GameItemRef.current?.offsetLeft < rem * 44
  }

  const GameItemHandle = (slug) => {
    route.push('/game/' + slug)
  }

  if (typeof game === 'object') {
    return (
      <GameItemContainer
        onClick={() => GameItemHandle(game.slug)}
        onMouseEnter={() => {
          setTooRight(isTooRight())
        }}
        tooRight={tooRight}
        ref={GameItemRef}
      >
        <Tilt
          tiltEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          tiltReverse
          transitionSpeed={400}
          scale={1.1}
          className={'GameTiltContainer'}
          onEnter={() => setShowVideo(true)}
          onLeave={() => setShowVideo(false)}
        >
          {favorite && <FaHeart className={'FavoriteIcon'} size={'1.5rem'} />}
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
              height={256}
              width={224}
            />
          </div>
          <GameItemActions className={'GameActions'}>
            <GameItemActionsContainer className={'GameActionsContainer'}>
              <div
                onClick={() => setFavorite(!favorite)}
                className={`GameActionButton ${favorite ? 'active' : null}`}
              >
                <FaHeart className={'GameActionIcon'} size={'1.2rem'} />
              </div>
            </GameItemActionsContainer>
          </GameItemActions>
          {showRating && game.total_rating && game.total_rating > 0 && (
            <GameRating className={'GameRating'}>
              <p>{Math.floor(game.total_rating)}</p>
            </GameRating>
          )}
          {game.videos && (
            <GameInfoBlock className={'GameInfoBlock'}>
              {showVideo && (
                <div className="video">
                  <YouTube
                    videoId={game.videos[0].video_id}
                    containerClassName="video"
                    onReady={(e) => e.target.playVideo()}
                    opts={{
                      height: '100%',
                      width: '100%',
                      playerVars: {
                        showinfo: 0,
                        controls: 0,
                        disablekb: 1,
                        modestbranding: 1,
                        origin: 'https://game-room.vercel.app'
                      }
                    }}
                  />
                </div>
              )}
            </GameInfoBlock>
          )}
        </Tilt>
      </GameItemContainer>
    )
  }

  if (game === 'seemore') {
    return (
      <GameItemContainer
        onClick={GameItemHandle}
        tooRight={tooRight}
        ref={GameItemRef}
      >
        <div className={'seemore'}>
          <FiPlus size={'3rem'} />
          <h1>Ver mais</h1>
        </div>
      </GameItemContainer>
    )
  }

  if (game === 'skeleton') {
    return (
      <GameItemContainer
        onClick={GameItemHandle}
        tooRight={tooRight}
        ref={GameItemRef}
      >
        <div className={'skeleton'} />
      </GameItemContainer>
    )
  }
}

export default GameItem
