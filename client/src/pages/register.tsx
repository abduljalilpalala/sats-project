import moment from 'moment'
import { NextPage } from 'next'

import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'
import useAuth from '~/hooks/auth'
import { SignInUpFormValues } from '~/shared/types'

const Register: NextPage = (): JSX.Element => {
  const { register, isError, error } = useAuth()

  const handleAuthSubmit = async (data: SignInUpFormValues): Promise<void> => {
    data.birth_date = moment(new Date(data.birth_date)).format('YYYY-MM-DD')
    await register(data)
  }

  return (
    <AuthLayout metaTitle="Registration">
      <AuthForm isLogin={false} actions={{ handleAuthSubmit }} axiosErrors={{ isError, error }} />
    </AuthLayout>
  )
}

export default Register
