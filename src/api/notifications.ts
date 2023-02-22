import instance from "../axios/axios";

export const sendNotification = async (formData: any) => {
  const result = await instance.post(`/chat/sendNotification`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};
