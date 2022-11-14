import Link from 'next/link'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { ISidebar } from '~/shared/interfaces'
import { sidebarLinks } from '~/shared/data/sidebarLinks'
import { X } from 'react-feather'

type Props = {
  isOpenDrawer: boolean
  handleToggleDrawer: () => void
}

const AdminDrawer: FC<Props> = ({ isOpenDrawer, handleToggleDrawer }): JSX.Element => {
  const router = useRouter()

  return (
    <aside>
      <div
        className={`
          fixed top-0 left-0 z-40 h-full min-h-screen w-full max-w-[280px]
          transform bg-slate-200 transition-all duration-300
          ease-in-out scrollbar-thin scrollbar-thumb-slate-500 scrollbar-thumb-rounded-md
          ${isOpenDrawer ? 'z-50 translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="relative flex min-h-screen flex-col justify-between">
          <div className="flex items-center justify-between bg-sats-30 px-5 py-4 text-white">
            <h1 className="text-base font-bold">Alumni Tracking System</h1>
            <button className="outline-none active:scale-95" onClick={handleToggleDrawer}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-between">
            <ul>
              {sidebarLinks.map(({ Icon, name, href }: ISidebar, i: number) => (
                <li key={i}>
                  <Link href={href}>
                    <a
                      className={`
                      flex w-full items-center space-x-4 px-6 py-3 text-base font-semibold
                      outline-none transition duration-150 ease-in-out
                      hover:cursor-pointer active:scale-95
                      ${
                        router.pathname.includes(href)
                          ? 'bg-sats-10 text-white'
                          : 'focus:bg-gray-100 hover:bg-gray-100 hover:text-sats-30'
                      }
                    `}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="line-clamp-1">{name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <>
        {isOpenDrawer && (
          <div
            onClick={handleToggleDrawer}
            className="fixed inset-0 z-30 cursor-default bg-slate-700/50 backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default AdminDrawer
