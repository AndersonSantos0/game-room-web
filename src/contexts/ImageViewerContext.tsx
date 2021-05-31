import React, { createContext, useContext, useState } from 'react'

interface ImageViewInterface {
  showImage: (image_id: string) => void
  closeImage: () => void
  showImageViewer: boolean
  imageViewId: string
}

const ImageViewContext = createContext({} as ImageViewInterface)

export const useImageView = () => useContext(ImageViewContext)

const ImageViewProvider: React.FC = ({ children }) =>{
  const [imageViewId, setImageViewId] = useState('')
  const [showImageViewer, setShowImageViewer] = useState(false)

  const showImage = (image_id) =>{
    setImageViewId(image_id)
    setShowImageViewer(true)
  }

  const closeImage = () =>{
    setShowImageViewer(false)
  }

  return(
    <ImageViewContext.Provider value={{
      showImage,
      showImageViewer,
      imageViewId,
      closeImage
    }}>
      {children}
    </ImageViewContext.Provider>
  )
}

export default ImageViewProvider