import Swal from 'sweetalert2';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Disclosure, Tab } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

import adminHooks from "~/hooks/admin/adminHooks";
import handleImageError from '~/utils/handleImageError';
import AdminLayout from '~/components/templates/AdminLayout';
import { ApplicationStatus } from '~/shared/data/roleConstant';
import getApplicationStatus from '~/utils/getApplicationStatus';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ManageUser: NextPage = (): JSX.Element => {
  const {
    isLoading,
    getAllApplicants,
    rejectApplicants,
    approveApplicants,
  } = adminHooks();

  const [alumniList, setAlumniList] = useState<any>({});

  useEffect(() => {
    getAllApplicants().then((res) => {
      
      setAlumniList({
        All: res.all,
        Approved: res.approved,
        Pending: res.pending,
      });
    });
  }, [isLoading]);

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
        approveApplicants(id);
        Swal.fire(
          'Approved!',
          `You approved ${name}.`,
          'success'
        );
      }
    });
  };

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
        rejectApplicants(id);
        Swal.fire(
          'Rejected!',
          `You rejected ${name}.`,
          'success'
        );
      }
    });
  };

  return (
    <AdminLayout metaTitle="Administrator | Manage User">
      <div className="flex justify-center items-center">
        <div className='w-[525px]'>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-sats-10 p-1">
              {Object.keys(alumniList).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-slate-50',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-sats-10 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-sats-30 shadow'
                        : 'bg-sats-30 bg-opacity-30 text-white text-opacity-100 hover:bg-opacity-100'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(alumniList)?.map((users: any, categoryID: number) => (
                <Tab.Panel
                  key={categoryID}
                  className={classNames(
                    'rounded-xl bg-slate-200 p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {users?.length === 0 
                  ? <h1 className="text-center text-slate-400">No available data</h1>
                  :<ul className="flex flex-col gap-2">
                    {users?.map((user: any, index: number) => {
                      const { name, avatar, is_verified, id, batch, email, number } = user;

                      return (
                        <Disclosure key={index}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-[#2563EB] bg-opacity-30 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-sats-10 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-slate-900 focus-visible:ring-opacity-75">
                                <div className="flex gap-3 justify-center items-center">
                                  <img
                                    src={avatar?.url}
                                    onError={(e) => handleImageError(e, '/images/avatar.png')}
                                    alt="profile"
                                    className="rounded-full max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px]"
                                  />
                                  <span>{name}</span>
                                </div>
                                <div className="flex gap-3">
                                  {getApplicationStatus(is_verified)}
                                  <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                      } h-9 w-9 `}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-5 mobile:px-0 pt-4 pb-2 text-sm text-slate-900 flex flex-row justify-between mobile:flex-col mobile:gap-5">
                                <div className="w-full">
                                  {[
                                    { header: "ID Number", value: id },
                                    { header: "Batch", value: batch?.name }
                                  ].map((data: any, index: number) => {
                                    const { header, value } = data;

                                    return (
                                      <div key={index} className="flex flex-row justify-between">
                                        <div className='w-[150px] mobile:w-[100px] flex flex-row justify-between'>
                                          <span>{header}</span>
                                          <span className="ml-5">:</span>
                                        </div>
                                        <div className='text-right'>
                                          <span className="truncate">{value}</span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {!is_verified ? null : (
                                    [
                                      { header: "Email", value: email },
                                      { header: "Number", value: number }
                                    ].map((data: any, index: number) => {
                                      const { header, value } = data;
                                      return (
                                        <div key={index} className="flex flex-row justify-between">
                                          <div className='w-[150px] mobile:w-[100px] flex flex-row justify-between'>
                                            <span>{header}</span>
                                            <span className="ml-5">:</span>
                                          </div>
                                          <div className='mobile:max-w-[150px] text-right mobile:truncate'>
                                            <span>{value}</span>
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                                {is_verified ? null : (
                                  <div className="flex flex-col gap-2 mobile:flex-row pl-10 mobile:!p-0">
                                    <button onClick={() => approve(name, id)} className={`w-15 mobile:w-full flex items-center justify-center bg-success py-1 hover:bg-opacity-60 transition ease-in-out px-10 rounded-md text-white`}>
                                      Approved
                                    </button>
                                    <button onClick={() => reject(name, id)} className={`w-15 mobile:w-full flex items-center justify-center bg-failed py-1 hover:bg-opacity-60 transition ease-in-out px-10 rounded-md text-white`}>
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      );
                    })}
                  </ul>
                  }
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageUser;
