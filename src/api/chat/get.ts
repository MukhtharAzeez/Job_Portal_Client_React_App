import instance from "../../axios/axios";

export const findChat = async (senderId: string, receiverId: string) => {
  const { data } = await instance.get(`/chat/find/${senderId}/${receiverId}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data;
};
