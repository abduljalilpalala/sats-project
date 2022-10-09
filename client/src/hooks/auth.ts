import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

import axios from '~/shared/lib/axios'
import { AxiosResponseError, SignInUpFormValues } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'

const useAuth = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const router = useRouter()
  const [error, setError] = useState<AxiosResponseError>({
    status: 0,
    content: null
  })

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async (data: SignInUpFormValues) => {
    try {
      setIsError(false)
      await csrf()
      const response = await axios.post('register', data)
      if (response.status === 204) {
        toast.error('Account currently not yet verified', { position: 'top-right' })
        router.push('/')
      }
    } catch (err: any) {
      setIsError(true)
      setError(catchError(err))
    }
  }

  return {
    isError,
    register,
    error
  }
}

export default useAuth
