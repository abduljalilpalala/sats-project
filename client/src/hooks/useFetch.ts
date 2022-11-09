import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr' 

export const useFetch = (url: string | null) => {
  const fetcher = async (url: string): Promise<any> =>
    await axios(url).then((res: AxiosResponse) => res.data)

  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  } 

  const { data, error, isValidating } = useSWR(url, fetcher, options)

  return {
    response: data,
    isLoading: !error && !data,
    isValidating,
  }
}
