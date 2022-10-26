import React from 'react'

const AlumniHeader = () => {
  return (
    <header className="sticky top-0 bg-[#4497ee] py-3 px-4 text-white md:px-8">
      <section className="mx-auto flex max-w-[90rem] items-center justify-between">
        <nav className="flex flex-shrink-0 items-center space-x-3">
          <img src="/images/logo.png" className="h-9 w-9" />
          <h1 className="text-md font-semibold">Alumni Tracking System</h1>
        </nav>
        <button className="overflow-hidden rounded-full ring-1 ring-white active:scale-95">
          <img src="/images/animated-avatar.jpg" className="h-7 w-7 rounded-full" />
        </button>
      </section>
    </header>
  )
}

export default AlumniHeader
