import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'
import toast from 'react-hot-toast'

import { AxiosResponseError, SignInUpFormFields, SignInUpFormValues } from '~/shared/types'

const useAxiosError = (
  isError: boolean,
  error: AxiosResponseError,
  setError: UseFormSetError<SignInUpFormValues>
) => {
  useEffect(() => {
    if (isError) {
      if (error.status === 422) {
        let entries = Object.entries<any>(error.content)
        entries.forEach((item) => {
          setError(item[0] as SignInUpFormFields, { type: 'custom', message: item[1][0] })
        })
      } else {
        toast.error(error.content, { position: 'top-right' })
      }
    }
  }, [isError])
}

export default useAxiosError
