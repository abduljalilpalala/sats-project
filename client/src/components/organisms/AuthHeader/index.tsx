import Link from 'next/link'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { clxs } from '~/helpers/classNames'

const AuthHeader: FC = (): JSX.Element => {
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 shadow-sm sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="" />
            <span className="self-center whitespace-nowrap text-base font-bold">
              Alumni Monitoring System
            </span>
          </a>
        </Link>
        <div className="flex md:order-2">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link href="/login">
              <a
                className={clxs(
                  'rounded-l-lg border border-gray-200 bg-white py-1 px-3 text-sm font-medium text-gray-900',
                  'hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700',
                  router.pathname === '/login' ? 'text-blue-700' : ''
                )}
              >
                Login
              </a>
            </Link>
            <Link href="/register">
              <a
                className={clxs(
                  'rounded-r-lg border border-gray-200 bg-white py-1 px-3 text-sm font-medium text-gray-900',
                  'hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700',
                  router.pathname === '/register' ? 'text-blue-700' : ''
                )}
              >
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AuthHeader
