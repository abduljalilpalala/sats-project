import React, { FC } from 'react'

const NewsFeedPostSkeleton: FC = (): JSX.Element => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          role="status"
          className="w-fulll mx-auto mt-5 max-w-xl animate-pulse rounded-md border border-gray-200 px-6 py-4 shadow"
        >
          <div className="mb-4 flex items-center space-x-3">
            <svg
              className="h-14 w-14 shrink-0 text-gray-200"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div>
              <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-200"></div>
              <div className="h-2 w-48 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="mb-2.5 h-2 rounded-full bg-gray-200"></div>
          <div className="h-2 rounded-full bg-gray-200"></div>

          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  )
}

export default NewsFeedPostSkeleton
