import moment from 'moment'
import type { NextPage } from 'next'

import useNewsFeed from '~/hooks/user/newsFeedHooks'
import AlumniLayout from '~/components/templates/AlumniLayout'
import NewsFeedPostSkeleton from '~/components/atoms/Skeletons/NewsFeedPostSkeleton'

const Index: NextPage = (): JSX.Element => {
  const { data, isLoading } = useNewsFeed()

  return (
    <AlumniLayout metaTitle="Home">
      <div className="boorder-slate-300 mx-auto mt-6 flex w-full max-w-xl items-center justify-between border-b-2">
        <h1 className=" pb-2 text-xl font-semibold text-[#083c76]">Admin Post</h1>
        <button className="flex -space-x-4 opacity-100 active:scale-95 lg:opacity-0">
          <img
            className="h-8 w-8 rounded-full border-2 border-white"
            src="https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-512"
            alt=""
          />
          <img
            className="h-8 w-8 rounded-full border-2 border-white"
            src="https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-512"
            alt=""
          />
          <img
            className="h-8 w-8 rounded-full border-2 border-white"
            src="https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-512"
            alt=""
          />
          <a
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-500 text-xs font-medium text-white"
            href="#"
          >
            +99
          </a>
        </button>
      </div>
      {isLoading ? (
        <NewsFeedPostSkeleton />
      ) : (
        <>
          {data?.map(({ id, content, created_at }) => (
            <section
              key={id}
              className="mx-auto mt-6 w-full max-w-xl rounded-lg border bg-white px-6 py-5 shadow transition duration-150 ease-in-out hover:bg-slate-50 hover:shadow-lg"
            >
              <header className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img src="/images/logo.png" alt="" className="h-8 w-8" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold">SLSU-TO - Admin</h1>
                  <p className="text-xs">{moment(created_at).fromNow()}</p>
                </div>
              </header>
              <main className="mt-3 px-2"><p className="break-words">{content}</p></main>
            </section>
          ))}
        </>
      )}
    </AlumniLayout>
  )
}

export { UserSignInOutAuthCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Index
