import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/user/userAuthSlicer";
import { likeComment } from "../../../../api/User/Post/post";
import { CommentReplies } from "./CommentReplies";

export function UserComment({ comment }: any) {
  const [replies, setReplies] = useState(false);
  const { userId } = useSelector(currentUser);
  const [totalLikes, setTotalLikes] = useState(comment.likes.length);
  async function likeAComment(commentId: string, userId: string) {
    const result = await likeComment(commentId, userId);
    if (result.data) setTotalLikes(totalLikes + 1);
    else setTotalLikes(totalLikes - 1);
  }
  return (
    <div key={comment._id}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
            alt=""
          />
        </div>
        <div className="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed border">
          <strong>
            {comment.userId.firstName + " " + comment.userId.lastName}
          </strong>{" "}
          <span className="text-xs text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>
          <p className="text-s max-w-xs">{comment.comment}</p>
          <div className="mt-4 flex items-center">
            <div
              className="text-sm text-gray-500 font-semibold cursor-pointer"
              onClick={() => likeAComment(comment._id, userId!)}
            >
              {totalLikes} Likes
            </div>
            <div
              className="text-sm text-gray-500  pl-5 font-semibold cursor-pointer"
              onClick={() => setReplies(!replies)}
            >
              {comment.replies.length} Replies
            </div>
          </div>
          {replies
            ? comment.replies.map(function (reply: any, index: number) {
              <CommentReplies key={index} reply={reply} />;
            })
            : ""}
        </div>
      </div>
    </div>
  );
}