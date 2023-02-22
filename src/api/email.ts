import instance from "../axios/axios";

export const sendEmail = async (formData: any) => {
  const result = await instance.post(`/auth/email`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};
