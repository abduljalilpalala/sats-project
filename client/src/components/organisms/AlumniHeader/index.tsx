import { IoLogOut } from 'react-icons/io5'
import React, { FC, Fragment } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { Menu, Transition } from '@headlessui/react'

import { clxs } from '~/helpers/classNames'
import userHooks from '~/hooks/user/userHooks'

type Props = {
  actions: {
    toggle: () => void
  }
}

const AlumniHeader: FC<Props> = (props): JSX.Element => {
  const { logout } = userHooks()
  const {
    actions: { toggle }
  } = props

  return (
    <header className="fixed inset-x-0 z-50 bg-[#4497ee] py-3 px-4 text-white md:px-8">
      <section className="mx-auto flex max-w-[90rem] items-center justify-between">
        <nav className="flex flex-shrink-0 items-center space-x-3">
          <img src="/images/logo.png" className="h-9 w-9" />
          <h1 className="text-md font-semibold">Alumni Tracking System</h1>
        </nav>
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
                <img src="/images/animated-avatar.jpg" className="h-8 w-8 rounded-full" />
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
                          onClick={toggle}
                          className={clxs(
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition duration-150 ease-in-out',
                            active ? 'bg-blue-500 text-white' : 'text-gray-500'
                          )}
                        >
                          <IoMdSettings className="mr-2 h-5 w-5 fill-current" />
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
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
    </header>
  )
}

export default AlumniHeader
