import * as React from "react";
import { getAllUsersPost } from "../../../../api/User/Get/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { PostSkeleton } from "../../../Common/skeleton/PostSkeleton";
import { AllUsersPost } from "./AllUsersPost";

export function Post() {
  const [postsData, setPostsData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skipCount, setSkipCount] = useState(0);

  async function fetchData() {
    const data = await getAllUsersPost(5, skipCount);
    setPostsData([...postsData, ...data]);
    setSkipCount(skipCount + 1);
    if (data.length == 0) setHasMore(false);
  }

  async function fetcher() {
    fetchData();
  }

  useEffect(() => {
    fetcher();
  },[]);

  return (
    <InfiniteScroll
      dataLength={postsData.length}
      next={fetcher}
      hasMore={hasMore}
      endMessage={
        <div className="w-full md:min-w-[450px]  flex justify-center">
          <div className="flex w-11/12  justify-around  items-center rounded-lg shadow-lg mb-4 bg-indigo-500 p-4 text-white">
            <div className="">
              <h4 className="mb-2 font-bold">Congrats 🍿</h4>
              <p>You all are Cached up </p>
            </div>
            <div className="w-12 flex justify-center">
              <div className="text-2xl bg-indigo-600 rounded-full p-3">
                <BeenhereIcon />
              </div>
            </div>
          </div>
        </div>
      }
      loader={<PostSkeleton />}
    >
      {postsData.map(function (post: any) {
        return <AllUsersPost key={post._id} post={post} />;
      })}
    </InfiniteScroll>
  );
}

