import { NextPage } from 'next'
import React, { FC } from 'react'

import UnderConstruction from '~/utils/UnderConstruction'
import AdminLayout from '~/components/templates/AdminLayout'

const Dashboard: NextPage = (): JSX.Element => {
  return (
    <AdminLayout metaTitle="Administrator | Dashboard">
      <div className="grid grid-cols-2 gap-x-3">
        <a
          href="#"
          className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-slate-100 md:max-w-xl md:flex-row"
        >
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
              Number of Post
            </h5>
            <p className="mb-3 font-normal text-slate-700">10000+</p>
          </div>
        </a>
        <a
          href="#"
          className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-slate-100 md:max-w-xl md:flex-row"
        >
          <img
            className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
              Number of Alumni
            </h5>
            <p className="mb-3 font-normal text-slate-700">3000+</p>
          </div>
        </a>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
