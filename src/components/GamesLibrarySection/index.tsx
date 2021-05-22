import { useEffect, useRef, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import GameItem from '../GameItem'
import {
  GamesLibraryContainer,
  GamesLibraryHeader,
  GamesLibrarySlide,
  GamesLibrarySlideArrows,
  GamesLibrarySlideContainer,
} from './styles'

type GameType = {
  id: number
  cover?: {
    id: number
    url: string
  }
  first_release_date: number
  name: string
  summary: string
}

interface GamesLibrarySectionProps {
  title?: string
  showRating?: boolean
  loading?: boolean
  type?: 'grid' | 'slide'
  data: GameType[]
}

const GamesLibrarySection = ({
  data,
  title,
  type = 'grid',
  showRating = false,
  loading = false
}: GamesLibrarySectionProps) => {
  const SlideRef = useRef<HTMLDivElement>(null)
  const [enabledLeftArrrow, setEnabledLeftArrrow] = useState(false)
  const [enabledRightArrrow, setEnabledRightArrrow] = useState(true)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [loadingRenderCount] = useState(new Array(12).fill(null))

  useEffect(() => {
    if (type === 'grid') return

    setScrollWidth(SlideRef.current.offsetWidth)
    setScrollOffset(SlideRef.current.scrollLeft)
    SlideRef.current?.addEventListener('scroll', () => {
      setScrollWidth(SlideRef.current.offsetWidth)
      setScrollOffset(SlideRef.current.scrollLeft)

      if (SlideRef.current.scrollLeft === 0) {
        setEnabledLeftArrrow(false)
      } else {
        setEnabledLeftArrrow(true)
      }

      if (
        SlideRef.current.offsetWidth + SlideRef.current.scrollLeft ===
        SlideRef.current.scrollWidth
      ) {
        setEnabledRightArrrow(false)
      } else {
        setEnabledRightArrrow(true)
      }
    })

    window.addEventListener('resize', () => {
      setScrollWidth(SlideRef.current.offsetWidth)
      setScrollOffset(SlideRef.current.scrollLeft)
    })

    return () =>{
      SlideRef.current?.removeEventListener('scroll', () => {})
      SlideRef.current?.removeEventListener('resize', () => {})
    }
  }, [])

  const handleLeftArrow = () => {
    let rem = Number(
      window
        .getComputedStyle(document.documentElement, null)
        .getPropertyValue('font-size')
        .replace('px', '')
    )
    if (
      SlideRef.current.offsetWidth + SlideRef.current.scrollLeft ===
      SlideRef.current.scrollWidth
    )
      return (SlideRef.current.scrollLeft =
        SlideRef.current.scrollLeft -
        (Math.floor(SlideRef.current.offsetWidth / (rem * 18)) - 1) *
          (rem * 18))
    return (SlideRef.current.scrollLeft =
      SlideRef.current.scrollLeft -
      Math.floor(SlideRef.current.offsetWidth / (rem * 18)) * (rem * 18))
  }

  const handleRightArrow = () => {
    let rem = Number(
      window
        .getComputedStyle(document.documentElement, null)
        .getPropertyValue('font-size')
        .replace('px', '')
    )
    return (SlideRef.current.scrollLeft =
      SlideRef.current.scrollLeft +
      Math.floor(SlideRef.current.offsetWidth / (rem * 18)) * (rem * 18))
  }

  if (type === 'grid')
    return (
      <GamesLibraryContainer>
        {data.map((game) => {
          return <GameItem key={game.id} game={game} />
        })}
      </GamesLibraryContainer>
    )

  if (type === 'slide')
    return (
      <GamesLibrarySlideContainer>
        <GamesLibraryHeader>
          <div>
            <h1>{title}</h1>
          </div>
          <GamesLibrarySlideArrows>
            <button disabled={ loading || !enabledLeftArrrow} onClick={handleLeftArrow}>
              <HiOutlineChevronLeft size={'1.5rem'} />
            </button>
            <button disabled={ loading || !enabledRightArrrow} onClick={handleRightArrow}>
              <HiOutlineChevronRight size={'1.5rem'} />
            </button>
          </GamesLibrarySlideArrows>
        </GamesLibraryHeader>
        <GamesLibrarySlide ref={SlideRef}>
          { !loading && data.map((game) => {
            return (
              <GameItem
                slidemode
                slideVars={{
                  slideOffset: scrollOffset,
                  slideWidth: scrollWidth,
                }}
                showRating={showRating}
                key={game.id}
                game={game}
              />
            )
          })}
          { !loading && <GameItem showRating={showRating} game={'seemore'} />}
          <div style={{position: 'absolute', display: 'flex', width: '100%', zIndex: -1}}>
          { loading && loadingRenderCount.map((item, key) => <GameItem key={key} showRating={showRating} game={'skeleton'} /> ) }
          </div>
        </GamesLibrarySlide>
      </GamesLibrarySlideContainer>
    )
}

export default GamesLibrarySection