import useSWR from 'swr'
import Swal from 'sweetalert2'
import { NextPage } from 'next'
import { AxiosResponse } from 'axios'
import React, { useState, useEffect } from 'react'
import { Disclosure, Tab } from '@headlessui/react'
import { ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { axios } from '~/shared/lib/axios'
import Loader from '~/components/atoms/Loader'
import adminHooks from '~/hooks/admin/adminHooks'
import handleImageError from '~/utils/handleImageError'
import AdminLayout from '~/components/templates/AdminLayout'
import getApplicationStatus from '~/utils/getApplicationStatus'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

const ManageUser: NextPage = (): JSX.Element => {
  const { data: studentForVerifications, mutate } = useSWR('/api/user', fetcher, {
    refreshInterval: 3000,
    revalidateOnMount: true
  })

  const { rejectApplicants, approveApplicants } = adminHooks()

  const [alumniList, setAlumniList] = useState<any>({
    All: studentForVerifications?.all,
    Approved: studentForVerifications?.approved,
    Pending: studentForVerifications?.pending
  })

  const [searchIn, setSearchIn] = useState<string>("All")
  const [searchInput, setSearchInput] = useState<string>("")

  useEffect(() => {
    if (alumniList) {
      setAlumniList({
        All: studentForVerifications?.all,
        Approved: studentForVerifications?.approved,
        Pending: studentForVerifications?.pending
      })
    }
  }, [studentForVerifications])

  const approve = (name: string, id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve'
    }).then((result) => {
      if (result.isConfirmed) {
        approveApplicants(id)
        mutate()
        Swal.fire('Approved!', `You approved ${name}.`, 'success')
      }
    })
  }

  const reject = (name: string, id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject'
    }).then((result) => {
      if (result.isConfirmed) {
        rejectApplicants(id)
        mutate()
        Swal.fire('Rejected!', `You rejected ${name}.`, 'success')
      }
    })
  }

  const searchFunction = (value: string) => {
    if (value === "") {
      return setAlumniList({
        All: studentForVerifications?.all,
        Approved: studentForVerifications?.approved,
        Pending: studentForVerifications?.pending
      })
    }

    let filteredData = studentForVerifications[searchIn?.toLowerCase()]?.filter((data: any, index: number) => {
      if (data?.name?.toLowerCase().includes(value.toLowerCase())) {
        return data
      }
    })
    setAlumniList((prev: any) => ({ ...prev, [searchIn]: [...filteredData] }))
  }

  const ManageUserApplication = (
    <div className="flex items-center justify-center">
      <div className="w-[525px]">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-sams-10 p-1">
            {Object.keys(alumniList).map((category) => (
              <Tab
                key={category}
                onClick={() => setSearchIn(category)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-slate-50',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-sams-10 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-sams-30 shadow'
                      : 'bg-sams-30 bg-opacity-30 text-white text-opacity-100 hover:bg-opacity-100'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <div className="w-full my-2 flex flex-row gap-3 p-2 border-2 border-slate-900 rounded-lg">
            <MagnifyingGlassIcon
              className="h-9 w-9"
            />
            <input
              type="text"
              className="w-full h-full border-none"
              placeholder="Search by name"
              onChange={(e: any) => {
                const value = e.target.value

                searchFunction(value)
                setSearchInput(value)
              }}
            />
          </div>
          <Tab.Panels className="mt-2">
            {Object.values(alumniList)?.map((users: any, categoryID: number) => (
              <Tab.Panel
                key={categoryID}
                className={classNames(
                  'rounded-xl bg-slate-200 p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {users?.length === 0 ? (
                  <h1 className="text-center text-slate-400">No available data</h1>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {users?.map((user: any, index: number) => {
                      const { name, avatar, is_verified, id, batch, email, number } = user

                      return (
                        <Disclosure key={index}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-[#2563EB] bg-opacity-30 px-4 py-2 text-left text-sm font-medium text-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-900 focus-visible:ring-opacity-75 hover:bg-sams-10 hover:text-white">
                                <div className="flex items-center justify-center gap-3">
                                  <img
                                    src={avatar?.url}
                                    onError={(e) => handleImageError(e, '/images/avatar.png')}
                                    alt="profile"
                                    className="max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] rounded-full"
                                  />
                                  <span>{name}</span>
                                </div>
                                <div className="flex gap-3">
                                  {getApplicationStatus(is_verified)}
                                  <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''} h-9 w-9 `}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="flex flex-row justify-between px-5 pt-4 pb-2 text-sm text-slate-900 mobile:flex-col mobile:gap-5 mobile:px-0">
                                <div className="w-full">
                                  {[
                                    { header: 'ID Number', value: id },
                                    { header: 'Batch', value: batch?.name }
                                  ].map((data: any, index: number) => {
                                    const { header, value } = data

                                    return (
                                      <div key={index} className="flex flex-row justify-between">
                                        <div className="flex w-[150px] flex-row justify-between mobile:w-[100px]">
                                          <span>{header}</span>
                                          <span className="ml-5">:</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="truncate">{value}</span>
                                        </div>
                                      </div>
                                    )
                                  })}
                                  {!is_verified
                                    ? null
                                    : [
                                      { header: 'Email', value: email },
                                      { header: 'Number', value: number }
                                    ].map((data: any, index: number) => {
                                      const { header, value } = data
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-row justify-between"
                                        >
                                          <div className="flex w-[150px] flex-row justify-between mobile:w-[100px]">
                                            <span>{header}</span>
                                            <span className="ml-5">:</span>
                                          </div>
                                          <div className="text-right mobile:max-w-[150px] mobile:truncate">
                                            <span>{value}</span>
                                          </div>
                                        </div>
                                      )
                                    })}
                                </div>
                                {is_verified ? null : (
                                  <div className="flex flex-col gap-2 pl-10 mobile:flex-row mobile:!p-0">
                                    <button
                                      onClick={() => approve(name, id)}
                                      className={`w-15 flex items-center justify-center rounded-md bg-success py-1 px-10 text-white transition ease-in-out hover:bg-opacity-60 mobile:w-full`}
                                    >
                                      Approved
                                    </button>
                                    <button
                                      onClick={() => reject(name, id)}
                                      className={`w-15 flex items-center justify-center rounded-md bg-failed py-1 px-10 text-white transition ease-in-out hover:bg-opacity-60 mobile:w-full`}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    })}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )

  return (
    <AdminLayout metaTitle="Administrator | Manage User">
      {!studentForVerifications ? <Loader /> : ManageUserApplication}
    </AdminLayout>
  )
}

export { AdminSignInOutAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default ManageUser
