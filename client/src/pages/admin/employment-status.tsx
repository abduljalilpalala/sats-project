import Swal from 'sweetalert2'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Disclosure, Tab } from '@headlessui/react'
import { ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import Loader from '~/components/atoms/Loader'
import handleImageError from '~/utils/handleImageError'
import AdminLayout from '~/components/templates/AdminLayout' 
import useSWR from 'swr';
import { axios } from '~/shared/lib/axios';
import { AxiosResponse } from 'axios';
import image from '~/utils/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const fetcher = (url: string) => axios.get(url).then((res: AxiosResponse) => res.data)

const EmploymentStatus: NextPage = (): JSX.Element => {  
  const { data: alumniEmploymentStatus } = useSWR('/api/employment-status', fetcher, {
    refreshInterval: 3000,
    revalidateOnMount: true
  })

  const allEmployment: any = {...alumniEmploymentStatus}

  const [employmentList, setEmploymentList] = useState<any>()
  
  useEffect(()=>{ 
    if (allEmployment?.employed) { 
      setEmploymentList({
        Employed: [...allEmployment?.employed],
        Unemployed: [...allEmployment?.unemployed],
        Selfemployed: [...allEmployment?.selfemployed],
      })
    }
  }, [alumniEmploymentStatus]) 
 
  const [searchIn, setSearchIn] = useState<string>("Employed")
  const [searchInput, setSearchInput] = useState<string>("")

  const searchFunction = (value: string) => {
    if (value === "") {
      return setEmploymentList({
        Employed: [...allEmployment?.employed],
        Unemployed: [...allEmployment?.unemployed],
        Selfemployed: [...allEmployment?.selfemployed]
      })
    }

    let filteredData = allEmployment[searchIn?.toLowerCase()]?.filter((data: any, index: number) => {
      if (data?.name?.toLowerCase().includes(value.toLowerCase())) {
        return data
      }
    })
    setEmploymentList((prev: any) => ({ ...prev, [searchIn]: [...filteredData] }))
  }

  const EmploymentStatusData = (
    <div className="flex justify-center items-center">
      <div className='w-[525px]'>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-sams-10 p-1">
            {['Employed', 'Unemployed', 'Selfemployed']?.map((category) => (
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
            {employmentList && Object.values(employmentList).map((lists:any, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-slate-200 p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {employmentList[searchIn]?.length === 0 ? (
                  <h1 className="text-center text-slate-400">No available data</h1>
                ) : (
                  <ul className="flex flex-col gap-2">   
                    {employmentList[searchIn]?.map((list: any, index: number) => {
                      const { name, avatar, id_number, batch, course, email, number, job } = list || {};
                      const { company_name, work_place, work_id_image, position } = job || {}
                      const tableRows = [
                        { header: "ID Number", value: id_number ?? "---" },
                        { header: "Batch", value: batch?.name },
                        { header: "Course", value: course?.name },
                        { header: "Email", value: email },
                        { header: "Contact Number", value: number },
                        { header: "Work Place", value: work_place },
                        { header: "Company Name", value: company_name },
                        { header: "Position", value: position },
                        { header: "Employment ID", value: work_id_image?.url && (
                          <a href={image(work_id_image?.url)} target="_new">
                            <img 
                              src={image(work_id_image?.url)} 
                              onError={(e) => handleImageError(e, '/images/id_dummy.png')}
                              alt="id_card"
                              className="max-w-[200px] max-h-[100px] min-w-[200px] min-h-[100px] rounded-md"
                            />
                          </a>
                        ) }
                      ]  

                      return (
                        <Disclosure key={index}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-[#2563EB] bg-opacity-30 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-sams-10 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-900 focus-visible:ring-opacity-75">
                                <div className="flex gap-3 justify-center items-center">
                                  <img
                                    src={image(avatar?.url)}
                                    onError={(e) => handleImageError(e, '/images/avatar.png')}
                                    alt="profile"
                                    className="rounded-full max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px]"
                                  />
                                  <span>{name}</span>
                                </div>
                                <div className="flex gap-3">
                                  <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''} h-9 w-9 `}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-5 mobile:px-0 pt-4 pb-2 text-sm text-slate-900 flex flex-row justify-between mobile:flex-col mobile:gap-5">
                                <table className='w-full'>
                                  <tbody>
                                    {
                                      tableRows?.map((data: any, index: number) => {
                                        const { header, value } = data;

                                        return (
                                          value && (
                                            <tr key={index}>
                                              <td className='w-[40%] align-top'>
                                                <span>{header}</span>
                                              </td>
                                              <td className='w-[10%] align-top'>
                                                <span>:</span>
                                              </td>
                                              <td className='flex justify-end items-end !w-full'>
                                                <span>{value}</span>
                                              </td>
                                            </tr>
                                          )
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
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
    <AdminLayout metaTitle="Administrator | Employment Status">
      {!alumniEmploymentStatus ? <Loader /> : EmploymentStatusData}
    </AdminLayout>
  )
}

export { AdminSignInOutAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default EmploymentStatus
