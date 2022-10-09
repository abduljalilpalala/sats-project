import { ImUsers } from 'react-icons/im'
import { MdDashboard, MdPostAdd } from 'react-icons/md'

import { ISidebar } from './../interfaces'

export const sidebarLinks: ISidebar[] = [
  {
    Icon: MdDashboard,
    name: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    Icon: MdPostAdd,
    name: 'Manage Post',
    href: '/admin/manage-post'
  },
  {
    Icon: ImUsers,
    name: 'Manage User',
    href: '/admin/manage-user'
  }
]
