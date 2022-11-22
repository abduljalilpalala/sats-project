import Head from 'next/head'
import userHooks from '~/hooks/user/userHooks'
import React, { FC, useState, ReactNode } from 'react'

import { alumniData } from '~/shared/data/alumniData'
import AlumniHeader from '~/components/organisms/AlumniHeader'
import AlumniSettings from '~/components/molecules/AlumniSettings'

type Props = {
  children: ReactNode
  metaTitle: string | 'Welcome'
}

const AlumniLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const { data: alumni, error } = userHooks()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = (): void => setIsOpen(!isOpen)

  return (
    <>
      <Head>
        <title>{`SATS | ${metaTitle}`}</title>
      </Head>

      {/* Alumni Header */}
      <AlumniHeader actions={{ toggle }} />

      <main className="mx-auto flex max-w-[90rem] pt-[60px] md:space-x-10 md:px-4">
        {/* The Profile Side */}
        <aside className="sticky top-[86px] hidden h-[330px] w-full max-w-[280px] overflow-hidden rounded-lg bg-white shadow md:block">
          <section className="h-[130px] overflow-hidden">
            <img src="/images/bg-slsu3.jpg" className="bg-contain" alt="" />
          </section>
          <section className="flex flex-col items-center">
            <header className="flex items-center justify-center">
              <div className="-mt-12 flex-shrink-0 overflow-hidden">
                <img
                  src="/images/animated-avatar.jpg"
                  className="h-[110px] w-[110px] rounded-full shadow"
                  alt=""
                />
              </div>
            </header>
            <main className="text-center">
              <h1 className="text-normal mt-4 text-xl line-clamp-1">{alumni?.name}</h1>
              <p className="text-xs line-clamp-1">{alumni?.email}</p>
            </main>
          </section>
          <section className="relative mt-8 flex flex-col px-4 ">
            <hr />
            <button
              onClick={toggle}
              className="pt-2 text-center text-sm text-[#083c76] active:scale-95"
            >
              My Profile
            </button>
            {isOpen && <AlumniSettings isOpen={isOpen} toggle={toggle} />}
          </section>
        </aside>

        {/* The Main Content for Admin Post */}
        <section className="w-full flex-1 bg-white bg-none px-4">{children}</section>

        {/* The Alumni List */}
        <aside className="sticky top-[86px] hidden h-[86vh] w-full max-w-[300px] overflow-hidden rounded-lg bg-white py-2 shadow lg:block">
          <header className="sticky top-0 mx-4 border-b border-slate-300 bg-white py-2">
            <h1 className="text-md font-medium text-[#083c76]">Alumni list</h1>
          </header>
          <nav className="-mt-4 h-full min-h-full w-full overflow-y-auto px-5 py-6 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
            <ul className="divide-y divide-slate-200">
              {alumniData.map((alumni) => (
                <li key={alumni.id} className="flex items-center space-x-3 py-2.5">
                  <img src="/images/animated-avatar.jpg" className="h-9 w-9 rounded-full" alt="" />
                  <div className="flex flex-col">
                    <h3 className="text-sm font-normal text-gray-900">{alumni.name}</h3>
                    <p className="text-xs font-light text-gray-500">{alumni.batch}</p>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </main>
    </>
  )
}

export default AlumniLayout
