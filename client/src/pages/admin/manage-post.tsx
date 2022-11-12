import React, {
  useState,
  useEffect
} from 'react';
import { NextPage } from 'next';
import TextareaAutosize from 'react-textarea-autosize';

import toast from 'react-hot-toast';
import Loader from '~/components/atoms/Loader';
import useIsLoading from '~/hooks/useIsLoading';
import adminHooks from '~/hooks/admin/adminHooks';
import AdminPost from '~/components/molecules/AdminPost';
import AdminLayout from '~/components/templates/AdminLayout';

const ManagePost: NextPage = (): JSX.Element => {
  const {
    isLoading,
    getAllPost,
    createNewPost,
    deletePost: callDeletePost,
  } = adminHooks();
  const [post, setPost] = useState<any>([]);
  const [postValue, setPostValue] = useState<string>("");
  const isDisabled = postValue.length <= 0;
  const { isPageLoading, setIsPageLoading } = useIsLoading();

  useEffect(() => {
    getAllPost().then((res) => {
      setPost(res);
      setIsPageLoading(false);
    });
  }, [isLoading]);

  const writePost = (e: any) => {
    const value = e.target.value;
    setPostValue(value);
  };

  const createPost = async () => {
    if (isDisabled) return;

    toast.promise(
      createNewPost(postValue).then((_) => {
        setPostValue("");
      }),
      {
        loading: 'Creating post...',
        success: <b>Post successfully created!</b>,
        error: <b>Creating post unsuccessful.</b>,
      }
    );
  };

  const deletePost = (id: number) => {
    toast.promise(
      callDeletePost(id),
      {
        loading: 'Deleting post...',
        success: <b>Post successfully deleted!</b>,
        error: <b>Deleting post unsuccessful.</b>,
      }
    );
  };

  const ManageAdminPost = (
    <div className='flex justify-center items-center'>
      <div className='w-[600px]'>
        <div className='bg-slate-200 rounded-md border-0 border-t-8 border-sats-30 px-10 mobile:!px-5 py-5 w-full flex flex-col gap-5 justify-center items-end'>
          <div className='flex gap-5 w-full'>
            <div className='max-h-[45px] max-w-[45px] min-h-[45px] min-w-[45px]'>
              <img
                src="/images/logo.png"
                alt="logo"
                height={100}
                width={100}
              />
            </div>
            <TextareaAutosize
              maxRows={5}
              value={postValue || ""}
              onChange={writePost}
              placeholder="Create new post..."
              className='w-full outline-none border-0 border-b bg-transparent h-10 '
            />
          </div>
          <button
            className={`
              ${isDisabled && "opacity-60 hover:bg-sats-10 cursor-not-allowed"}  
              w-15 flex items-center justify-center
              bg-sats-10 py-1 hover:bg-sats-30 transition ease-in-out px-10 rounded-md text-white`}
            onClick={createPost}
            disabled={isDisabled}
          >
            Post
          </button>
        </div>
        <h1 className='w-full py-6 text-sats-30 font-bold text-medium'>All post</h1>
        <div className='flex flex-col gap-6'>
          {post?.length === 0 && <span className='text-center w-full text-slate-400'>No available post</span>}
          {post?.map((user: { content: string, date: string, id: number; }, index: number) => {
            const { content, date, id } = user;

            return <AdminPost
              key={index}
              isAdmin={true}
              date={date}
              post={content}
              onClick={() => deletePost(id)}
            />;
          })}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout metaTitle="Administrator | Manage Post">
      {isPageLoading ? <Loader /> : ManageAdminPost}
    </AdminLayout>
  );
};

export default ManagePost;
