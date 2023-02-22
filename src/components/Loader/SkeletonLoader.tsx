import React from "react";

function SkeletonLoader() {
  return (
    <div role="status" className="space-y-2.5 px-20 animate-pulse max-w-lg mt-4">
      <div className="w-full">
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[480px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[440px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[460px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[360px mb-2.5]"></div>
        <div className="h-2.5.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[480px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[440px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[460px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[360px]"></div>
        <div className="h-2.5.5 bg-gray-100 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 max-w-[480px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 mb-2.5"></div>
        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-200 mb-2.5"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
