import { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import Carousel, { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import GameItem from '../NewGameItem'
import {
  GamesLibraryHeader,
  GamesLibrarySlideArrows,
  GamesLibrarySlideContainer,
} from './styles'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  eight: {
    breakpoint: { max: 3000, min: 0 },
    items: 8,
    slidesToSlide: 8,
    partialVisibilityGutter: 8,
  },
  seven: {
    breakpoint: { max: 2000, min: 0 },
    items: 7,
    slidesToSlide: 7,
    partialVisibilityGutter: 8,
  },
  six: {
    breakpoint: { max: 1800, min: 0 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 8,
  },
  five: {
    breakpoint: { max: 1500, min: 0 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 8,
  },
  four: {
    breakpoint: { max: 1250, min: 0 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 12,
  },
  three: {
    breakpoint: { max: 1100, min: 0 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 16,
  },
  two: {
    breakpoint: { max: 800, min: 0 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 24,
  },
  one: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 96,
  },
}

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

interface GamesLibrarySectionProps {
  title?: string
  showRating?: boolean
  loading?: boolean
  type?: 'grid' | 'slide'
  data: GameType[]
  loadingItemsCount?: number
}

interface CarouselButtonGroupProps extends ButtonGroupProps {
  loading?: boolean;
  enabledLeftArrrow?: boolean;
  enabledRightArrrow?: boolean;
}

const CustomButtonGroupAsArrows = ({ previous, next, loading, enabledLeftArrrow, enabledRightArrrow}: CarouselButtonGroupProps) => {
  return (
    <GamesLibrarySlideArrows>
      <button
        disabled={loading || !enabledLeftArrrow}
        onClick={previous}
      >
        <HiOutlineChevronLeft size={'1.5rem'} />
      </button>
      <button
        disabled={loading || !enabledRightArrrow}
        onClick={next}
      >
        <HiOutlineChevronRight size={'1.5rem'} />
      </button>
    </GamesLibrarySlideArrows>
  )
}

const CustomDots = ({ active, onClick }: DotProps) => {
  return (
    <div
      style={{
        height: 2.5,
        background: active ? '#fff' : 'rgba(255,255,255,.4)',
        width: 18,
        margin: '0 2px',
      }}
      onClick={onClick}
    />
  )
}

const GamesLibrarySection = ({
  data,
  title,
  type = 'grid',
  loading = false,
  loadingItemsCount = 30,
}: GamesLibrarySectionProps) => {
  const [enabledLeftArrrow, setEnabledLeftArrrow] = useState(false)
  const [enabledRightArrrow, setEnabledRightArrrow] = useState(true)
  const [loadingRenderCount] = useState(new Array(loadingItemsCount).fill(null))

  if (type === 'slide')
    return (
      <GamesLibrarySlideContainer>
        <GamesLibraryHeader>
          <div>
            <h1>{title}</h1>
          </div>
        </GamesLibraryHeader>
        <Carousel
          infinite
          partialVisible
          showDots
          arrows={false}
          responsive={responsive}
          keyBoardControl
          customTransition="ease 600ms"
          containerClass="container"
          itemClass="game"
          dotListClass="dots"
          renderButtonGroupOutside
          renderDotsOutside
          customButtonGroup={<CustomButtonGroupAsArrows loading={loading} enabledLeftArrrow={true} enabledRightArrrow={true} />}
          customDot={<CustomDots />}
        >
          { !loading && data.map((game) => {
            return <GameItem showRating={true} key={game.id} game={game} />
          })}
          { loading && loadingRenderCount.map((item, key) => <GameItem key={key} game={"skeleton"}/>)}
        </Carousel>
      </GamesLibrarySlideContainer>
    )
}

export default GamesLibrarySection
