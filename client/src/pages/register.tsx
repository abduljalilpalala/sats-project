import moment from 'moment'
import { NextPage } from 'next'

import useAuth from '~/hooks/auth'
import { User } from '~/shared/types'
import AuthForm from '~/components/molecules/AuthForm'
import AuthLayout from '~/components/templates/AuthLayout'

const Register: NextPage = (): JSX.Element => {
  const { register, isError, error } = useAuth()

  const handleAuthSubmit = async (data: User): Promise<void> => {
    data.birth_date = moment(new Date(data.birth_date)).format('YYYY-MM-DD')
    await register(data)
  }

  return (
    <AuthLayout metaTitle="Registration">
      <AuthForm actions={{ handleAuthSubmit }} type="alumni" axiosErrors={{ isError, error }} />
    </AuthLayout>
  )
}

export default Register
