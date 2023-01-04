import useSWR from 'swr'
import { AxiosResponse } from 'axios'

import { axios } from '~/shared/lib/axios'
import { IPost } from '~/shared/interfaces'

const useNewsFeed = () => {
  const { data, mutate } = useSWR(
    '/api/post',
    () =>
      axios
        .get('/api/post')
        .then((res: AxiosResponse) => res.data as IPost[])
        .catch((error) => {
          if (error.response.status !== 409) throw error?.response?.statusText
        }),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  return {
    data,
    mutate,
    isLoading: !data
  }
}

export default useNewsFeed
