import React from 'react'
import { NextPage } from 'next'

import { SignInUpFormValues } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import useAuth from '~/hooks/auth'

const Login: NextPage = (): JSX.Element => {
  const { login, isError, error } = useAuth()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    await login(data)
  }

  return (
    <AuthLayout metaTitle="Registration">
      <AuthForm isLogin actions={{ handleAuthSubmit }} axiosErrors={{ isError, error }} />
    </AuthLayout>
  )
}

export default Login
