import Head from 'next/head'
import { NextPage } from 'next'
import React, { useState } from 'react'

import DatePicker from 'react-datepicker'

const Register: NextPage = (): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <Head>
        <title>Alumni Tracking System | Register</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center text-slate-900 md:bg-slate-50">
        <section className="my-8 w-full max-w-lg rounded-lg bg-white px-8 py-8 md:border md:shadow-md">
          <div className="flex flex-col items-center justify-center">
            <div className="flex-shrink-0">
              <img src="/images/logo.png" className="h-32 w-32" alt="" />
            </div>
            <p className="py-2 text-xl font-bold">Alumni Tracking System</p>
            <h1 className="text-xl font-bold text-indigo-900">Registration</h1>
          </div>
          <form action="#" method="POST">
            <div className="grid gap-x-6 gap-y-4">
              <div className="col-span-12">
                <label htmlFor="id-number" className="block text-sm font-medium text-slate-700">
                  ID Number <small className="italic">Optional</small>
                </label>
                <input
                  type="text"
                  autoComplete="id-number"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Name <small className="text-rose-600">*</small>
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
                  Email address <small className="text-rose-600">*</small>
                </label>
                <input
                  type="text"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-slate-700"
                >
                  Birth Date <small className="text-rose-600">*</small>
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contact Number <small className="italic">optional</small>
                </label>
                <input
                  type="text"
                  autoComplete="contact-number"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label htmlFor="country" className="block text-sm font-medium text-slate-700">
                  Employment Status
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Unemployed</option>
                  <option>Employed</option>
                  <option>Self-Employed</option>
                </select>
              </div>
              <div className="col-span-12">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password <small className="text-rose-600">*</small>
                </label>
                <input
                  type="password"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Confirm Password <small className="text-rose-600">*</small>
                </label>
                <input
                  type="password"
                  autoComplete="password"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-3 text-right">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Register
