import Head from 'next/head'
import React, { FC, useState } from 'react'
import { clxs } from '~/helpers/classNames'

import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import Sidebar from '~/components/organisms/Sidebar'

type Props = {
  children: React.ReactNode
  metaTitle: string | 'Welcome'
}

const AdminLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleOpen = (): void => setIsOpen(!isOpen)

  return (
    <>
      <Head>
        <title>{`Admin | ${metaTitle}`}</title>
      </Head>
      {/* Admin Header */}
      <Header actions={{ handleOpen }} />
      <div className="flex overflow-hidden bg-gray-100 pt-16">
        {/* Admin Sidebar */}
        <Sidebar isOpen={isOpen} />
        {/* Main Content */}
        <div
          className={clxs(
            'relative h-full min-h-screen w-full overflow-y-auto bg-gray-50',
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
