import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoLogOut } from 'react-icons/io5'

import { clxs } from '~/helpers/classNames'
import { ISidebar } from '~/shared/interfaces'
import { sidebarLinks } from '~/shared/data/sidebarLinks'

type Props = {
  isOpen: boolean
}

const Sidebar: React.FC<Props> = (props): JSX.Element => {
  const { isOpen } = props
  const router = useRouter()

  return (
    <aside
      className={clxs(
        'fixed top-0 left-0 z-20 flex h-full flex-shrink-0 flex-col bg-white pt-16',
        isOpen ? 'w-64' : 'w-[68px]'
      )}
    >
      <section className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 pt-0">
        <main className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 space-y-1 divide-y px-3">
            <ul className="space-y-2 pb-2">
              {sidebarLinks.map(({ Icon, name, href }: ISidebar, i: number) => (
                <li key={i}>
                  <Link href={href}>
                    <a
                      className={clxs(
                        'group flex items-center rounded-lg p-2 text-base font-semibold',
                        'transition duration-150 ease-in-out hover:bg-gray-100',
                        'focus:bg-gray-100 focus:text-blue-500 active:scale-95',
                        'hover:cursor-pointer',
                        router.pathname.includes(href)
                          ? 'text-blue-500'
                          : 'text-gray-600 group-hover:text-blue-500'
                      )}
                    >
                      <Icon
                        className={clxs(
                          'h-6 w-6 transition duration-75 group-focus:text-blue-500',
                          router.pathname.includes(href)
                            ? 'text-blue-500'
                            : 'text-gray-600 group-hover:text-blue-500'
                        )}
                      />
                      {isOpen && <span className="ml-3 group-hover:text-blue-500">{name}</span>}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                className={clxs(
                  'group flex items-center rounded-lg p-2 text-base font-semibold',
                  'transition duration-150 ease-in-out hover:bg-gray-100',
                  'focus:bg-gray-100 focus:text-blue-500 active:scale-95',
                  'w-full text-gray-600 hover:cursor-pointer'
                )}
              >
                <IoLogOut
                  className={clxs(
                    'h-6 w-6 text-gray-500 transition duration-75 group-focus:text-blue-500',
                    'w-full text-gray-600 group-hover:text-blue-500'
                  )}
                />
                {isOpen && <span className="ml-4 group-hover:text-blue-500">Logout</span>}
              </button>
            </div>
          </nav>
        </main>
      </section>
    </aside>
  )
}

export default Sidebar
