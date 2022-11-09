import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import axios from '~/shared/lib/axios'
import { setData } from '~/utils/setData'
import { catchError } from '~/utils/handleAxiosError'
import { Password } from '~/shared/types';

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

  const changeAdminPassword = async (data: Password | null) => {
    try {
      const response = await axios.put('/api/user/change-password', data)
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      toast.success('Password reset successfully!')
      setFetchStatus(
        setData(fetchStatus, {
          error: {
            status: 0,
            content: null
          }
        })
      )
      return response
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const getSmsStatus = async () => {
    try {
      const response = await axios.get('/api/admin/sms-status')
      
      return response?.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const setSmsSetting = async (status: boolean | undefined) => {
    try {
      const response = await axios.post('/api/admin/change-sms-setting')

      toast.success(`Automatic post to SMS turned ${status ? 'on' : 'off'}!`)
      setFetchStatus(setData(fetchStatus, { isSuccess: true }))

      return response
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const getAllApplicants = async () => {
    try {
      const response = await axios.get('/api/user') 

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const setErrorMessage = (err: { response: any }) => {
    toast.error('Something went wrong, please try again later.')

    setFetchStatus(setData(fetchStatus, { isError: true }))
    setFetchStatus(setData(fetchStatus, { error: catchError(err) }))

    return err?.response
  }

  return {
    error,
    isError,
    isSuccess,
    isLoading,
    fetchStatus,
    getSmsStatus,
    setSmsSetting,
    getAllApplicants,
    changeAdminPassword
  }
}

export default adminHooks
