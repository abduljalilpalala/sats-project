import Head from 'next/head'
import Image from 'next/image'
import React, { FC } from 'react'

const UnderConstruction: FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Under Construction</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div>
          <Image
            src="/images/under-construction.png"
            alt="Cry Emoji Image"
            width={400}
            height={302}
            blurDataURL="/images/404.png"
            placeholder="blur"
            layout="intrinsic"
          />
        </div>
        <section className="flex flex-col items-center">
          <h1 className="text-lg font-medium text-yellow-900 md:text-3xl">
            This page is under construction
          </h1>
          <p className="mt-3 text-center text-sm text-gray-500 md:text-base">
            We're working on it!
          </p>
        </section>
      </main>
    </>
  )
}

export default UnderConstruction
