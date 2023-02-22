import instance from "../../../axios/axios";

export const addPostToServer = async (formData: any) => {
  const { data } = await instance.post("/userPost/addPost", formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
};

export const postLike = async (postId: string, userId: string) => {
  const result = await instance.get(
    `/userPost/like?postId=${postId}&userId=${userId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return result;
};

export const postComment = async (
  postId: string,
  userId: string,
  comment: string
) => {
  await instance.post(
    `/userPost/comment`,
    { postId, userId, comment },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

export const getPostComment = async (postId: string) => {
  const comments = await instance.get(
    `/userPost/getComments?postId=${postId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return comments;
};

export const likeComment = async (commentId: string, userId: string) => {
  const result = await instance.get(
    `/userPost/likeAComment?commentId=${commentId}&userId=${userId}`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return result;
};