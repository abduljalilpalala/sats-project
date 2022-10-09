import React, { FC } from 'react'

type Props = {}

const Footer: FC<Props> = (): JSX.Element => {
  return (
    <footer className="mx-5 p-4 py-8 md:px-6">
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="block text-center text-sm text-gray-400">© 2022. All Rights Reserved.</span>
    </footer>
  )
}

export default Footer
