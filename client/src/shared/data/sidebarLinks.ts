import { Grid, FilePlus, Users } from 'react-feather'

import { ISidebar } from './../interfaces'

export const sidebarLinks: ISidebar[] = [
  {
    Icon: Grid,
    name: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    Icon: FilePlus,
    name: 'Manage Post',
    href: '/admin/manage-post'
  },
  {
    Icon: Users,
    name: 'Manage User',
    href: '/admin/manage-user'
  }
]
