import {
  GameItemActions,
  GameItemActionsContainer,
  GameItemContainer,
  GameRating,
  GameInfoBlock,
} from './styles'
import Tilt from 'react-parallax-tilt'
import { FaHeart } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import Image from 'next/image'
import { Slide } from 'react-slideshow-image'
import moment from 'moment'
import YouTube from 'react-youtube'

let images = [
  'https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc99kt.jpg',
  'https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc99ko.jpg',
  'https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc99ks.jpg',
]

type GameType = {
  id: number
  cover?: {
    id: number
    url: string
  }
  first_release_date: number
  name: string
  summary: string
  total_rating?: number
  video?: string
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
  slidemode = true,
  slideVars,
}: GameItemProps) => {
  const GameItemRef = useRef<HTMLDivElement>(null)

  const [tooRight, setTooRight] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (slidemode) return
    setTooRight(window.innerWidth - GameItemRef.current?.offsetLeft < 400)
    window.addEventListener('resize', () => {
      setTooRight(window.innerWidth - GameItemRef.current?.offsetLeft < 400)
    })

    return () => window.removeEventListener('resize', () => {})
  }, [])

  const isTooRight = () => {

    let rem = Number(
      window
        .getComputedStyle(document.documentElement, null)
        .getPropertyValue('font-size')
        .replace('px', '')
    )

    return (
      slideVars.slideWidth +
        slideVars.slideOffset -
        GameItemRef.current?.offsetLeft <
        (rem * 34)
    )
  }

  const GameItemHandle = () => {
  }

  if (typeof game === 'object')
    return (
      <GameItemContainer
        onClick={GameItemHandle}
        onMouseEnter={() => {
          setTooRight(isTooRight())
          setShowVideo(true)
        }}
        onMouseLeave={() => setShowVideo(false)}
        tooRight={tooRight}
        ref={GameItemRef}
      >
        <Tilt
          tiltEnable={true}
          tiltMaxAngleX={ 5}
          tiltMaxAngleY={ 5}
          tiltReverse
          transitionSpeed={400}
          scale={1.1}
          className={'GameTiltContainer'}
        >
          {favorite && <FaHeart className={`FavoriteIcon`} size={'1.5rem'} />}
          <div className="GameTiltContent">
            <h1>{game.name}</h1>
            <h2 className="Date">
              {moment(game.first_release_date * 1000.05).format('MMMM Do YYYY')}
            </h2>
            <h2 className="Ago">
              {moment(game.first_release_date * 1000).fromNow()}
            </h2>
          </div>
          <div className="cover">
            <Image
              src={
                game.cover?.url
                  ? 'https:' + game.cover.url
                  : '/default-cover.png'
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
                <FaHeart className={`GameActionIcon`} size={'1.2rem'} />
              </div>
            </GameItemActionsContainer>
          </GameItemActions>
          {showRating && game.total_rating && game.total_rating > 0 && (
            <GameRating className={'GameRating'}>
              <p>{Math.floor(game.total_rating)}</p>
            </GameRating>
          )}
          {game.video && <GameInfoBlock className={'GameInfoBlock'}>
            {showVideo && (
              <div className="video">
                <YouTube
                  videoId={game.video}
                  containerClassName="video"
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      showinfo: 0,
                      controls: 0,
                      autoplay: 1,
                      disablekb: 1,
                      modestbranding: 1,
                      origin: 'https://game-room.vercel.app'
                    },
                  }}
                />
              </div>
            )
            }
          </GameInfoBlock>}
        </Tilt>
      </GameItemContainer>
    )

  if (game === 'seemore')
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

  if (game === 'skeleton')
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

export default GameItem
