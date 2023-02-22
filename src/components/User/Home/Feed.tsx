import React, { useState } from "react";
import { Jobs } from "./Jobs";
import { AddPost } from "./userFeeds/AddPost";
import { Post } from "./userFeeds/Post";

export function Feed() {
  const [jobs, setJobs] = useState(true);
  const changeToJobs = () => {
    setJobs(true);
  };
  const changeToFeeds = () => {
    setJobs(false);
  };
  return (
    <div className="mt-20">
      <label htmlFor="Toggle3" className="inline-flex items-center p-2 rounded-md  dark:text-gray-400 w-full text-center">
        <span className={`cursor-pointer px-4 py-2 rounded-l-md ${jobs ? 'dark:bg-gray-800' : 'dark:bg-gray-300'} w-full`} onClick={changeToJobs}>Jobs</span>
        <span className={`cursor-pointer px-4 py-2 rounded-r-md ${!jobs ? 'dark:bg-gray-800' : 'dark:bg-gray-300'} w-full`} onClick={changeToFeeds}>Feeds</span>
      </label>
      {!jobs ? (
        <>  
          <AddPost />
          <Post/>
        </>
      ) : (
        <>
          <Jobs />
        </>
      )}
      <div className="h-8 w-full bg-transparent"></div>
    </div>
  );
}