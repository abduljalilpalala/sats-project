import useSWR from 'swr'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosResponse } from 'axios'
import { deleteCookie } from 'cookies-next'

import { axios } from '~/shared/lib/axios'
import redirect from '~/utils/redirect'
import { IAlumniData } from '~/shared/interfaces'
import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'

const userHooks = () => {
  const [error, setError] = useState<AxiosResponseError>({
    status: 0,
    content: null
  })

  const { data, mutate } = useSWR(
    '/api/auth',
    () =>
      axios
        .get('/api/auth')
        .then((res: AxiosResponse) => res.data as IAlumniData)
        .catch((error) => {
          if (error.response.status !== 409) throw error?.response?.statusText
          redirect('/verify-email')
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const logout = async () => {
    try {
      await axios.post('/api/logout')
      deleteCookie('token')
      toast.success('Logout successfully!')
      location.reload()
      redirect('/login')
    } catch (err: any) {
      return setError(catchError(err))
    }
  }

  return {
    data,
    error,
    mutate,
    logout,
    isLoading: !data
  }
}

export default userHooks
