import Link from 'next/link'
import React, { Fragment } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { HiMenuAlt4 } from 'react-icons/hi'
import { BiCaretDown } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'

import { clxs } from '~/helpers/classNames'

type Props = {
  actions: {
    handleOpen: () => void
  }
}

const Header: React.FC<Props> = ({ actions }): JSX.Element => {
  const { handleOpen } = actions

  return (
    <header className="fixed z-30 w-full border-b border-gray-200 bg-white">
      <main className="flex items-center justify-between px-3 py-3 lg:px-5 lg:pl-3">
        <section className="flex items-center">
          <button
            type="button"
            onClick={handleOpen}
            className={clxs(
              'mr-2 cursor-pointer rounded p-2 text-gray-600 hover:text-gray-900',
              'focus:bg-gray-100 focus:ring-gray-100 hover:bg-gray-100',
              'transition duration-150 ease-in-out active:scale-95'
            )}
          >
            <HiMenuAlt4 className="h-6 w-6" />
          </button>
          <Link href="/admin/dashboard">
            <a className="lg:(ml-2.5) ml-1.5 text-xl font-bold">
              <h1 className="self-center whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                  Alumni Tracking System
                </span>
              </h1>
            </a>
          </Link>
        </section>
        <section className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button
                  type="button"
                  className={clxs(
                    'flex items-center space-x-2 rounded-lg text-gray-500 hover:text-gray-900',
                    'transition duration-150 ease-in-out active:scale-95'
                  )}
                >
                  <img
                    src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM="
                    className="h-8 w-8 rounded-full"
                  />
                  <BiCaretDown className={clxs('h-4 w-4', open ? 'rotate-180' : 'rotate-0')} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={clxs(
                      'absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1',
                      'ring-black ring-opacity-5 focus:outline-none'
                    )}
                  >
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={clxs(
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition duration-150 ease-in-out',
                              active ? 'bg-blue-500 text-white' : 'text-gray-500'
                            )}
                          >
                            <IoLogOut className="mr-2 h-5 w-5" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </section>
      </main>
    </header>
  )
}

export default Header
