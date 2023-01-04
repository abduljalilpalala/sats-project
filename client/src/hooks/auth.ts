import { useState } from 'react'
import toast from 'react-hot-toast'
import { setCookie } from 'cookies-next'

import { axios, setBearerToken } from '~/shared/lib/axios'
import { Roles } from '~/shared/data/roleConstant'
import { catchError } from '~/utils/handleAxiosError'
import { AxiosResponseError, User } from '~/shared/types'

const useAuth = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<AxiosResponseError>({
    status: 0,
    content: null
  })

  const register = async (data: User) => {
    try {
      setIsError(false) 
      
      const form = new FormData();
      form.append("name", data.name);
      form.append("email", data.email);
      form.append("birth_date", data.birth_date);
      form.append("contact_number", data.contact_number);
      form.append("employment_status", data.employment_status);
      form.append("batch", data.batch);
      form.append("id_number", data.id_number);
      form.append("course_id", data.course_id);
      form.append("password", data.password);
      form.append("password_confirmation", data.password_confirmation);
      form.append("work_place", data.work_place);
      form.append("company_name", data.company_name);
      form.append("position", data.position);
      data.work_id ? form.append("work_id", data.work_id[0]) : '/images/id_dummy.png'

      const response = await axios.post('/api/register', form, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
        }
      })
      if (response.status === 204) {
        toast.error('Account currently not yet verified please wait to the admin for approval.', {
          position: 'top-right'
        })
        window.location.href = 'login'
      }
    } catch (err: any) {
      setIsError(true)
      setError(catchError(err))
    }
  }

  const login = async (data: User) => {
    try {
      setIsError(false)

      const response = await axios.post('/api/login', data)
      const token = response.data.token
      setCookie('token', token)
      setBearerToken(token)

      if (response.statusText === 'OK') {
        if (response?.data?.role === Roles.ADMIN) {
          toast.success('You have successfully logged in!', { position: 'top-right' })
          window.location.href = '/admin/dashboard'
          return
        }

        if (!response?.data?.is_verified) {
          toast.error('Account currently not yet verified', { position: 'top-right' })
        } else {
          window.location.href = '/'
        }
      }
    } catch (err: any) {
      setIsError(true)
      setError(catchError(err))
    }
  }

  return {
    isError,
    register,
    login,
    error
  }
}

export default useAuth
