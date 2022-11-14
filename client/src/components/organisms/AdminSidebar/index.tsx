import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { LogOut, Settings } from 'react-feather'

import { clxs } from '~/helpers/classNames'
import { ISidebar } from '~/shared/interfaces'
import adminHooks from '~/hooks/admin/adminHooks'
import { sidebarLinks } from '~/shared/data/sidebarLinks'
import AdminSettings from '~/components/molecules/AdminSettings'

type Props = {
  isOpen: boolean
}

const AdminSidebar: React.FC<Props> = (props): JSX.Element => {
  const { isOpen } = props
  const router = useRouter()
  const { logout } = adminHooks()
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  return (
    <aside
      className={clxs(
        'fixed top-0 left-0 z-20 flex h-full flex-shrink-0 flex-col pt-16',
        'w-full flex-1 bg-slate-200 transition-all duration-300 ease-in-out',
        isOpen ? 'max-w-0 translate-x-0 md:max-w-[256px]' : 'max-w-0 -translate-x-full'
      )}
    >
      <AdminSettings
        isOpen={isSettingsOpen}
        setIsOpen={() => {
          setIsSettingsOpen(!isSettingsOpen)
        }}
      />
      <section className="hidden flex-1 flex-col justify-between overflow-hidden md:flex">
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
          <div className="border-t border-slate-400">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              type="button"
              className={`
                flex h-12 w-full items-center space-x-4 px-6 py-3 text-base font-semibold
                outline-none transition duration-150 ease-in-out focus:bg-gray-100
                hover:cursor-pointer hover:bg-gray-100 hover:text-sats-30 active:scale-95
              `}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className={`
                flex h-12 w-full items-center space-x-4 px-6 py-3 text-base font-semibold
                outline-none transition duration-150 ease-in-out focus:bg-gray-100
                hover:cursor-pointer hover:bg-gray-100 hover:text-sats-30 active:scale-95
              `}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </section>
    </aside>
  )
}

export default AdminSidebar
