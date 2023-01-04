import useSWR from 'swr'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosResponse } from 'axios'
import { deleteCookie } from 'cookies-next'

import { axios } from '~/shared/lib/axios'
import redirect from '~/utils/redirect'
import { IAlumniList } from '~/shared/interfaces'
import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'

const useAlumni = () => {
  const [error, setError] = useState<AxiosResponseError>({
    status: 0,
    content: null
  })

  const { data: alumniDataList, mutate } = useSWR(
    '/api/alumni',
    () =>
      axios
        .get('/api/alumni')
        .then((res: AxiosResponse) => res.data as IAlumniList[])
        .catch((error) => {
          if (error.response.status !== 409) throw error?.response?.statusText
          toast.error(error?.response?.statusText)
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    alumniDataList,
    error,
    mutate,
    isLoading: !alumniDataList
  }
}

export default useAlumni
