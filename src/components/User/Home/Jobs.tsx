import * as React from "react";
import { getJobsPosts } from "../../../api/User/Get/post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { PostSkeleton } from "../../Common/skeleton/PostSkeleton";
import { CompanyPosts } from "./CompanyPosts/CompanyPosts";

export function Jobs() {
  const [jobsData, setJobsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skipCount, setSkipCount] = useState(0);

  async function fetchData() {
    const data = await getJobsPosts(4, skipCount);
    const newData = jobsData.concat(data);
    setJobsData(newData)
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
      dataLength={jobsData.length}
      next={fetcher}
      hasMore={hasMore}
      endMessage={
        <div className="w-full md:min-w-[450px] flex justify-center ">
          <div className="flex w-11/12 justify-around items-center rounded-lg shadow-lg mb-4 bg-indigo-500 p-4 text-white">
            <div className="">
              <h4 className="mb-2 font-bold">Congrats 🍿</h4>
              <p>You all are Cached up </p>
            </div>
            <div className="w-12 flex justify-center">
              <div className="text-2xl bg-indigo-600 rounded-full p-3">
                <BeenhereIcon/>
              </div>
            </div>
          </div>
        </div>
      }
      loader={<PostSkeleton />}
    >
      {jobsData.map(function (job: any) {
        return <CompanyPosts key={job._id} post={job} />;
      })}
    </InfiniteScroll>
  );
}