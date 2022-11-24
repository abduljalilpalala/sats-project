import Head from 'next/head'
import React, { FC, useState } from 'react'
import dynamic from 'next/dynamic'
import createPersistedState from 'use-persisted-state'

import Footer from '~/components/organisms/Footer'
import AdminHeader from '~/components/organisms/AdminHeader'
import AdminDrawer from '~/components/organisms/AdminDrawer'

const AdminSidebar = dynamic(() => import('~/components/organisms/AdminSidebar'), { ssr: false })

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const useSidebarState = createPersistedState<boolean>('sidebarToggle')

const AdminLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useSidebarState(true)
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)

  return (
    <>
      <Head>
        <title>{`Admin | ${metaTitle}`}</title>
      </Head>
      {/* Admin Header */}
      <AdminHeader actions={{ handleToggleSidebar, handleToggleDrawer }} />
      <div className="relative mx-auto w-full pt-16">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={isOpenSidebar} />
        {/* Admin Drawer */}
        <div className="block md:hidden">
          <AdminDrawer isOpenDrawer={isOpenDrawer} handleToggleDrawer={handleToggleDrawer} />
        </div>
        {/* Main Content */}
        <div className="relative h-full min-h-screen overflow-y-auto bg-white">
          <main
            className={`mx-auto min-h-[80vh] max-w-6xl p-5 pl-4 ${
              isOpenSidebar ? 'pl-4 md:pl-60' : ''
            }`}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
export default AdminLayout
