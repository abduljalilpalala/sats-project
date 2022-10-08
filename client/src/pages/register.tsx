import { NextPage } from 'next'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import { SignInUpFormValues } from '~/shared/types'

const Register: NextPage = (): JSX.Element => {
  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  }

  return (
    <AuthLayout metaTitle="Registration">
      <AuthForm isLogin={false} actions={{ handleAuthSubmit }} />
    </AuthLayout>
  )
}

export default Register
