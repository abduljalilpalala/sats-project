import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

const NotFound: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter()
  const [counter, setCounter] = useState<number>(5)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    if (!counter) router.push('/')
  }, [counter])

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main
        className="flex h-screen min-h-screen items-center justify-center px-4"
        style={{
          background: `linear-gradient(180deg, #083C76 17.22%, rgba(8, 60, 118, 0) 99.97%), #4497EE`
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 scale-75">
            <img src="/images/not-found.png" className="w-full" alt="" />
          </div>
          <div className="-mt-8 lg:-mt-16">
            <h1 className="flex-wrap px-12 text-justify text-white sm:text-base md:text-xl lg:text-2xl">
              Page not found, you will be redirected to home page in {counter}s
            </h1>
          </div>
        </div>
      </main>
    </>
  )
}

export default NotFound
