import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { NextPage } from 'next'

import { clxs } from '~/helpers/classNames'

const NotFound: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main
        className={clxs(
          'flex h-screen min-h-screen items-center justify-center px-4',
          'bg-white text-gray-800 transition duration-700 ease-in-out'
        )}
      >
        <div className="flex max-w-md flex-col items-center space-y-4">
          <header className=" flex items-center">
            <span className="-mr-6 text-9xl font-extrabold">4</span>
            <div>
              <Image
                src="/images/404.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                blurDataURL="/images/emoji.png"
                placeholder="blur"
                layout="intrinsic"
              />
            </div>
            <span className="-ml-8 text-9xl font-extrabold">4</span>
          </header>
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-bold uppercase">Oops! Page not be found</h2>
            <p className="text-center text-sm text-gray-500">
              Sorry but the page you are looking for does not exist, have been removed. name changed
              or is temporarily unavailable
            </p>
          </section>
          <Link href="/">
            <a
              className={clxs(
                'rounded-full bg-yellow-300 px-6 py-3 text-white hover:bg-yellow-400',
                'duration-15 font-semibold transition ease-in-out hover:shadow-xl',
                'cursor-pointer transition duration-150 ease-in-out focus:outline-none'
              )}
            >
              Back to Homepage
            </a>
          </Link>
        </div>
      </main>
    </>
  )
}

export default NotFound
