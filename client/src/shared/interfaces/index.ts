import { IconType } from 'react-icons'

export interface ISidebar {
  Icon: IconType
  name: string
  href: string
}

export interface Alumni {
  id: string
  name: string
  batch: string
}
