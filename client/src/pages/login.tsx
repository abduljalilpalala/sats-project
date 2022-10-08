import React from 'react'
import { NextPage } from 'next'

import { SignInUpFormValues } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'

const Login: NextPage = (): JSX.Element => {
  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  }

  return (
    <AuthLayout metaTitle="Registration">
      <AuthForm isLogin actions={{ handleAuthSubmit }} />
    </AuthLayout>
  )
}

export default Login
