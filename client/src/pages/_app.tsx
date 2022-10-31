import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import '~/shared/css/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default MyApp
