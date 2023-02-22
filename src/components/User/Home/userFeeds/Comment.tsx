import { CardContent } from "@mui/material";
import React from "react";
import { UserComment } from "./UserComment";

interface Comment {
  _id: string
  userId: string
  postId: string
  comment: string
  createdAt: Date
  updatedAt: Date
}
interface Props {
  comments: Array<Comment>
}
export function Comment({ comments }: Props) {
  return (
    <CardContent>
      <div className="antialiased mx-auto max-w-screen-sm max-h-96 overflow-scroll">
        <h3 className="mb-4 text-lg font-semibold text-white-900">
          {comments.length} Comments....
        </h3>
        <div className="space-y-4">
          {comments.map(function (comment: Comment) {
            return <UserComment key={comment} comment={comment} />;
          })}
        </div>
      </div>
    </CardContent>
  );
}
