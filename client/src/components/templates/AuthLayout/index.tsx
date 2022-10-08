import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'

import AuthHeader from '~/components/organisms/AuthHeader'

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
        <title key="auth">{`Alumni Tracking System | ${props.metaTitle}`}</title>
      </Head>
      <AuthHeader />
      <main className="flex min-h-screen items-center justify-center text-slate-900 md:bg-slate-50">
        <section className="mt-20 mb-8 w-full max-w-lg rounded-lg bg-white px-8 py-10 md:border md:shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="py-6 text-2xl font-bold text-indigo-900">
              {isLogin ? 'Login' : 'Registration'}
            </h1>
          </div>
          {props.children}
          <footer className="flex items-center justify-center space-x-2 pt-4 text-center text-sm">
            <span>{isLogin ? "You don't have an account?" : 'Do you have an account?'}</span>
            <Link href={isLogin ? '/register' : '/login'}>
              <a className="font-medium text-indigo-600 hover:underline">
                {isLogin ? 'Register' : 'Login'}
              </a>
            </Link>
          </footer>
        </section>
      </main>
    </>
  )
}

export default AuthLayout
