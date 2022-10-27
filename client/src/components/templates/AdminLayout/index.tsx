import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { FC, useState } from 'react'
import { clxs } from '~/helpers/classNames'
import createPersistedState from 'use-persisted-state'

import Footer from '~/components/organisms/Footer'
import AdminHeader from '~/components/organisms/AdminHeader'

const AdminSidebar = dynamic(() => import('~/components/organisms/AdminSidebar'), { ssr: false })

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const useSidebarState = createPersistedState<boolean>('sidebarToggle')

const AdminLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpen, setIsOpen] = useSidebarState(true)

  const handleOpen = (): void => setIsOpen(!isOpen)

  return (
    <>
      <Head>
        <title>{`Admin | ${metaTitle}`}</title>
      </Head>
      {/* Admin Header */}
      <AdminHeader actions={{ handleOpen }} />
      <div className="flex overflow-hidden pt-16">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={isOpen} />
        {/* Main Content */}
        <div
          className={clxs(
            'relative h-full min-h-screen w-full overflow-y-auto bg-white',
            isOpen ? `ml-64` : `ml-16`
          )}
        >
          <main className="mx-auto min-h-[80vh] max-w-6xl p-5">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
export default AdminLayout
