import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import axios from '~/shared/lib/axios'
import { setData } from '~/utils/setData'
import { catchError } from '~/utils/handleAxiosError'

const adminHooks = () => {
  const router = useRouter()
  const [fetchStatus, setFetchStatus] = useState<any>({
    isError: false,
    isSuccess: false,
    isLoading: false,
    error: {
      status: 0,
      content: null
    }
  })
  const { isError, isSuccess, isLoading, error } = fetchStatus
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const changeAdminPassword = async (data: any) => {
    try {
      await csrf()
      const response = await axios.put('/api/user/change-password', data)

      toast.success('Password reset successfully!')
      setFetchStatus(
        setData(fetchStatus, {
          error: {
            status: 0,
            content: null
          }
        })
      )
      return response;
    } catch (err: any) {
      setFetchStatus(setData(fetchStatus, { error: catchError(err) }))
      return err?.response
    }
  }

  return {
    error,
    isError,
    isSuccess,
    isLoading,
    fetchStatus,
    changeAdminPassword
  }
}

export default adminHooks
