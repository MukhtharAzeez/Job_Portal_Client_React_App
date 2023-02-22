import instance from "../../../axios/axios";

export const updateUserProfile = async (formData: any) => {
  const result = await instance.post(`/user/updateProfile`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const sendMessageToFriend = async (senderId:string, receiverId:string,type:string) => {
  const result = await instance.post(
    `/chat`,
    { receiverId, senderId ,type},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return result;
};