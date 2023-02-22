import React from "react";

export function CommentReplies({ reply }: any) {
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
            src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt=""
          />
        </div>
        <div className="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed ">
          <strong>Sarah</strong>{" "}
          <span className="text-xs text-gray-400">3:34 PM</span>
          <p className="text-xs sm:text-sm ">{reply}</p>
        </div>
      </div>
    </div>
  );
}