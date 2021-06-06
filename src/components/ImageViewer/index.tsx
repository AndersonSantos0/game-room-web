import { useImageView } from '../../contexts/ImageViewerContext'
import { ImageViewerBack, ImageViewerContainer } from './styles'

const ImageViewer = () => {
  const { closeImage, showImageViewer, imageViewId } = useImageView()

  if (!showImageViewer) return <></>

  return (
    <ImageViewerContainer>
      <ImageViewerBack onClick={closeImage} />
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_original/${imageViewId}.png`}
      />
    </ImageViewerContainer>
  )
}

export default ImageViewer
