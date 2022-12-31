import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/20/solid";

import Swal from "sweetalert2";
import getDaysAgo from '~/utils/getDaysAgo';
import MoreIcon from "~/shared/icons/MoreIcon";
import useHydrationBypass from "~/hooks/useHydrationBypass";

type PostContent = {
  date: string
  post: string
  isAdmin?: boolean
  onClick: (value?: number) => void
}

const AdminPost = (props: PostContent) => {
  useHydrationBypass();
  const { date, post, isAdmin = false, onClick } = props;

  const deletePost = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onClick()
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <section className="w-full rounded-lg border bg-white px-6 py-5 shadow transition duration-150 ease-in-out hover:bg-slate-50 cursor-default">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img src="/images/logo.png" alt="" className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold">SLSU-TO - Admin</h1>
            <p className="text-xs">{getDaysAgo(date)}</p>
          </div>
        </div>
        {isAdmin && (
          <Menu
            as="div"
            className="relative inline-block text-left"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <MoreIcon />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-failed text-white' : 'text-failed'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={deletePost}
                      >
                        <TrashIcon width={15} className="mr-3" />
                        Delete post
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </header>
      <main className="mt-3 px-2">
        <p className="break-words">
          {post}
        </p>
      </main>
    </section>
  );
};

export default AdminPost;
