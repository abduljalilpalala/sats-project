import React from 'react'
import { NextPage } from 'next'

import { User } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import useAuth from '~/hooks/auth'

const Login: NextPage = (): JSX.Element => {
  const { login, isError, error } = useAuth()

  const handleAuthSubmit = async (data: User): Promise<void> => {
    await login(data)
  }

  return (
    <AuthLayout metaTitle="Login">
      <AuthForm
        isLogin
        actions={{ handleAuthSubmit }}
        type="alumni"
        axiosErrors={{ isError, error }}
      />
    </AuthLayout>
  )
}

export { UserSignInOutAuthCheck as getServerSideProps } from '~/utils/getServerSideProps';
export default Login
