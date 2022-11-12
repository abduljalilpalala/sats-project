import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

import axios from '~/shared/lib/axios'
import redirect from '~/utils/redirect'
import { setData } from '~/utils/setData'
import { Password } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'

const adminHooks = () => {
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
      setFetchStatus(setData(fetchStatus, { isLoading: false }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const approveApplicants = async (id: number) => {
    try {
      const response = await axios.post('/api/user', { id })
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const rejectApplicants = async (id: number) => {
    try {
      const response = await axios.delete(`/api/user/${id}`)
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const getAllPost = async () => {
    try {
      const response = await axios.get('/api/post')
      setFetchStatus(setData(fetchStatus, { isLoading: false }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const createNewPost = async (post: string) => {
    try {
      const response = await axios.post('/api/post', { content: post })
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const updatePost = async (data: { id: number; post: string }) => {
    const { id, post } = data

    try {
      const response = await axios.put(`/api/post/${id}`, { content: post })
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const deletePost = async (id: number) => {
    try {
      const response = await axios.delete(`/api/post/${id}`)
      setFetchStatus(setData(fetchStatus, { isLoading: true }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const getDashboardData = async (id: number) => {
    try { 
      const response = await axios.get(`/api/admin/dashboard?batch=${id}`)
      setFetchStatus(setData(fetchStatus, { isLoading: false }))

      return response.data
    } catch (err: any) {
      return setErrorMessage(err)
    }
  }

  const logout = async () => {
    try {
      await axios.post('/logout')
      toast.success('Logout successfully!')
      redirect('/admin')
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
    logout,
    getAllPost,
    updatePost,
    deletePost,
    getSmsStatus,
    createNewPost,
    setSmsSetting,
    setFetchStatus,
    getDashboardData,
    getAllApplicants,
    rejectApplicants,
    approveApplicants,
    changeAdminPassword
  }
}

export default adminHooks
