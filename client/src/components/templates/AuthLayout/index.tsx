import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

import { clxs } from '~/helpers/classNames'

type Props = {
  children: ReactNode
  metaTitle: string
}

const AuthLayout: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const isLogin = router.pathname === '/login'

  return (
    <>
      <Head>
        <title>SLSU Alumi | {props.metaTitle}</title>
      </Head>
      <main className="flex min-h-screen justify-center overflow-y-hidden bg-[#113053] text-white">
        <section
          className={clxs(
            'hidden w-full max-w-[65%] bg-cover lg:block',
            isLogin
              ? 'bg-[url(/images/bg-alumni-login.png)]'
              : 'bg-[url(/images/bg-alumni-register.png)]'
          )}
        >
          <div className="flex h-screen flex-col justify-between py-6">
            <div className="flex flex-shrink-0 items-center space-x-8 px-8">
              <img src="/images/logo.png" className="h-14 w-14" />
              <h1 className="text-2xl font-medium uppercase text-white line-clamp-1">
                Southern Leyte State University
              </h1>
            </div>
            <div className="flex-shrink-0">
              <ul className="flex flex-col space-y-1 px-24 md:text-6xl lg:text-7xl">
                <li className="font-extrabold tracking-wider text-white text-opacity-80">
                  <span className="text-[#05387b]">S</span>LSU
                </li>
                <li className="ml-6 font-extrabold tracking-wider text-white text-opacity-80">
                  <span className="text-[#05387b]">A</span>lumni
                </li>
                <li className="ml-14 font-extrabold tracking-wider text-white text-opacity-80">
                  <span className="text-[#05387b]">T</span>racking
                </li>
                <li className="font-extrabold tracking-wider text-white text-opacity-80">
                  <span className="ml-20 text-[#05387b]">S</span>ystem
                </li>
              </ul>
            </div>
            <p className="mb-4 text-center">@sats-2022</p>
          </div>
        </section>
        <section
          className={clxs(
            'relative mx-auto flex min-h-screen w-full max-w-md flex-1 flex-shrink-0 flex-col items-start',
            'justify-between overflow-y-auto py-6 px-6 lg:items-center lg:justify-center lg:py-0'
          )}
        >
          <div className="flex items-center space-x-3 bg-[#113053] px-4 lg:hidden">
            <div className="flex-shrink-0">
              <img src="/images/logo.png" className="h-14 w-14" alt="" />
            </div>
            <div className="flex flex-col text-sm font-medium">
              <span>SOUTHERN LEYTE</span>
              <span>STATE UNIVERSITY</span>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className={`${isLogin && 'mb-14'}`}>
              <h1 className="text-center text-4xl font-semibold">
                {isLogin ? 'Welcome back' : 'Registration'}
              </h1>
            </div>
            <div className="mt-4 w-full px-6">{props.children}</div>
            <footer className="flex items-center justify-center space-x-2 pt-4 text-center text-sm">
              <span>{!isLogin ? 'Already have an account?' : "Doesn't have an account yet?"}</span>
              <Link href={!isLogin ? '/login' : '/register'}>
                <a className="font-medium text-[#4497ee] hover:underline">
                  {isLogin ? 'Register' : 'Login'}
                </a>
              </Link>
            </footer>
          </div>
          <div></div>
        </section>
      </main>
    </>
  )
}

export default AuthLayout
