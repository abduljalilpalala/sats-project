import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useAuth from '~/hooks/auth'
import { SignInUpFormValues } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import { Roles } from '~/shared/data/roleConstant'

const Admin: NextPage = (): JSX.Element => {
  const { login, isError, error } = useAuth()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    data.role_id = Roles.ADMIN
    await login(data)
  }

  return (
    <>
      <Head>
        <title>Admin Login</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main
        className="flex h-screen min-h-screen items-center justify-center px-4"
        style={{
          background: `linear-gradient(180deg, #083C76 17.22%, rgba(8, 60, 118, 0) 99.97%), #4497EE`
        }}
      >
        <div className="w-full max-w-sm space-y-10">
          <div className="flex flex-shrink-0 flex-col items-center space-y-6">
            <img src="/images/logo.png" className="h-24 w-24" alt="" />
            <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          </div>
          <AuthForm
            isLogin
            type="admin"
            actions={{ handleAuthSubmit }}
            axiosErrors={{ isError, error }}
          />
        </div>
      </main>
    </>
  )
}

export default Admin
