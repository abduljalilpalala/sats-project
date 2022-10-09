import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useAuth from '~/hooks/auth'
import { SignInUpFormValues } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'

const Admin: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { register, isError, error } = useAuth()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        router.push('/admin/dashboard')
      }, 3000)
    })
  }

  return (
    <>
      <Head>
        <title>Alumni Tracking System | Admin</title>
      </Head>
      <section className="flex h-screen justify-center bg-white">
        <div className="relative hidden w-2/3 bg-[url('/images/bg-slsu3.jpg')] bg-cover lg:block">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="flex h-screen items-center px-20">
            <div className="space-y-2">
              <h2 className="rounded border bg-white/30 p-0.5 text-5xl font-bold text-white drop-shadow-lg">
                Alumni Tracking System
              </h2>
              <p className="mt-3 max-w-xl text-xl text-white drop-shadow-md">
                Warning: Unauthorized Personnel are Strictly Prohibited
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-center text-4xl font-bold text-gray-700">Administrator</h2>
              <p className="mt-3 text-gray-500">only authorized personnel are allowed</p>
            </div>
            <div className="mt-8">
              <AuthForm isLogin actions={{ handleAuthSubmit }} axiosErrors={{ isError, error }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Admin
