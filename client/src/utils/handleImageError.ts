import { SyntheticEvent } from 'react'

const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>, image: string): void => {
  event.currentTarget.src = image
  event.currentTarget.onerror = null
}

export default handleImageError
